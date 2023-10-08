import { type APIResponse, publicApi } from '@/service/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

interface Storaged {
  accessToken: string
  refreshToken: string
}

interface AuthContextData {
  signIn: (params: { email: string; password: string }) => Promise<void>
  signUp: (params: { email: string; password: string; username: string }) => Promise<void>
  signOut: () => void
  accessToken?: string
  refreshToken?: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string>()
  const [refreshToken, setRefreshToken] = useState<string>()

  useEffect(() => {
    void loadStorageData()
  }, [])

  async function loadStorageData(): Promise<void> {
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
  }

  const signIn = useCallback(
    async (params: { email: string; password: string }) => {
      const { data } = await publicApi.post<
        APIResponse<{ accessToken: string; refreshToken: string }>
      >('/signIn', params)

      console.log(data)

      setAccessToken(data.result.data.accessToken)
      setRefreshToken(data.result.data.refreshToken)
      await AsyncStorage.setItem(
        '@Tokens',
        JSON.stringify({
          accessToken: data.result.data.accessToken,
          refreshToken: data.result.data.refreshToken
        })
      )
    },
    [setAccessToken, setRefreshToken]
  )

  const signUp = useCallback(
    async (params: { email: string; password: string; username: string }) => {
      try {
        const { data } = await publicApi.post<
          APIResponse<{ accessToken: string; refreshToken: string }>
        >('/user', params)

        console.log(data)

        setAccessToken(data.result.data.accessToken)
        setRefreshToken(data.result.data.refreshToken)
        await AsyncStorage.setItem(
          '@Tokens',
          JSON.stringify({
            accessToken: data.result.data.accessToken,
            refreshToken: data.result.data.refreshToken
          })
        )
      } catch (err) {
        console.error(JSON.stringify(err, null, 2))
      }
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
        refreshToken
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
