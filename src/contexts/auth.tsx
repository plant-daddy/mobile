import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

interface Storaged {
  accessToken: string
  refreshToken: string
}

interface AuthContextData {
  signIn: (params: { email: string; password: string }) => Promise<void>
  signUp: (params: { email: string; password: string; name: string }) => Promise<void>
  signOut: () => void
  accessToken?: string
  refreshToken?: string
  loading: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string>()
  const [refreshToken, setRefreshToken] = useState<string>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    void loadStorageData()
  }, [])

  async function loadStorageData(): Promise<void> {
    setLoading(true)
    try {
      const tokensSerializable = await AsyncStorage.getItem('@Tokens')

      if (tokensSerializable) {
        const { accessToken, refreshToken }: Storaged = JSON.parse(tokensSerializable)
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
      }
    } catch (error) {
      setAccessToken(undefined)
      setRefreshToken(undefined)
    }
    setLoading(false)
  }

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true)
      setAccessToken(email)
      setRefreshToken(email)
      await AsyncStorage.setItem(
        '@Tokens',
        JSON.stringify({ accessToken: email, refreshToken: email })
      )
      setLoading(false)
    },
    [setAccessToken, setRefreshToken]
  )

  const signUp = useCallback(
    async ({ email, password, name }: { email: string; password: string; name: string }) => {
      setLoading(true)
      setAccessToken(email)
      setRefreshToken(email)
      await AsyncStorage.setItem(
        '@Tokens',
        JSON.stringify({ accessToken: email, refreshToken: email })
      )
      setLoading(false)
    },
    [setAccessToken, setRefreshToken]
  )

  const signOut = useCallback(async () => {
    setAccessToken(undefined)
    setRefreshToken(undefined)
    await AsyncStorage.removeItem('@Tokens')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        accessToken,
        loading
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
