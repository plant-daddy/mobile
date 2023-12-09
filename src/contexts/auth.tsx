import { type APIResponse, publicApi } from '@/service/api'
import notifee from '@notifee/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isAxiosError } from 'axios'
import { useRouter } from 'expo-router'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'

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
  setTokens: ({
    accessToken,
    refreshToken
  }: {
    accessToken: string
    refreshToken: string
  }) => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState<string>()
  const [refreshToken, setRefreshToken] = useState<string>()

  const router = useRouter()

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

  const setTokens = useCallback(
    async ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      await AsyncStorage.setItem(
        '@Tokens',
        JSON.stringify({
          accessToken,
          refreshToken
        })
      )
    },
    []
  )

  const signIn = useCallback(
    async (params: { email: string; password: string }) => {
      try {
        const { data } = await publicApi.post<
          APIResponse<{ accessToken: string; refreshToken: string }>
        >('/signIn', params)

        await setTokens({
          accessToken: data.result.data.accessToken,
          refreshToken: data.result.data.refreshToken
        })
      } catch (error) {
        if (isAxiosError(error)) JSON.stringify(error, null, 2)
        Alert.alert('Invalid credentials')
      }
    },
    [setAccessToken, setRefreshToken]
  )

  const signUp = useCallback(
    async (params: { email: string; password: string; username: string }) => {
      try {
        const { data } = await publicApi.post<
          APIResponse<{ accessToken: string; refreshToken: string }>
        >('/user', { ...params, role: 'endUser' })

        await setTokens({
          accessToken: data.result.data.accessToken,
          refreshToken: data.result.data.refreshToken
        })

        router.push('/first-plant')
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
    await notifee.cancelAllNotifications()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        accessToken,
        refreshToken,
        setTokens
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
