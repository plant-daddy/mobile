import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

type AuthState =
  | {
      authenticated: false
      loading: boolean
    }
  | {
      authenticated: true
      loading: false
      token: string
    }

type AuthContextData = {
  signIn: (params: { email: string; password: string }) => Promise<void>
  signUp: (params: { email: string; password: string; name: string }) => Promise<void>
  signOut: () => void
} & AuthState

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [authState, setAuthState] = useState({
    authenticated: false,
    loading: true
  } as AuthState)

  useEffect(() => {
    void loadStorageData()
  }, [])

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData')
      if (authDataSerialized) {
        const _authState: AuthState = JSON.parse(authDataSerialized)
        setAuthState(_authState)
      }
    } catch (error) {
      setAuthState({ authenticated: false, loading: false })
    }
  }

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const _authState = {
        authenticated: true,
        loading: false as const,
        token: email
      }

      setAuthState(_authState)
      await AsyncStorage.setItem('@AuthData', JSON.stringify(_authState))
    },
    [setAuthState]
  )

  const signUp = useCallback(
    async ({ email, password, name }: { email: string; password: string; name: string }) => {
      const _authState = {
        authenticated: true,
        loading: false as const,
        token: email
      }

      setAuthState(_authState)
      await AsyncStorage.setItem('@AuthData', JSON.stringify(_authState))
    },
    [setAuthState]
  )

  const signOut = useCallback(async () => {
    const _authState = {
      authenticated: false as const,
      loading: false
    }

    setAuthState(_authState)
    await AsyncStorage.removeItem('@AuthData')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        ...authState
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within an AuthProvider.')

  return context
}
