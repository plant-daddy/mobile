import { useAuth } from '@/contexts/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { type AxiosError } from 'axios'

let isRefreshing = false
let failedRequestQueue: any[] = []

const setupAPIClient = () => {
  const { signOut, accessToken, refreshToken } = useAuth()

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    async (error: AxiosError) => {
      if (error?.response?.status === 401) {
        const originalConfig = error.config!

        if (!isRefreshing) {
          api
            .post('/refresh', {
              refreshToken
            })
            .then(async (response) => {
              const { accessToken: returnedAccessToken, refreshToken: returnedRefreshToken } =
                response.data

              await AsyncStorage.setItem(
                '@Tokens',
                JSON.stringify({
                  accessToken: returnedAccessToken,
                  refreshToken: returnedRefreshToken
                })
              )

              api.defaults.headers.Authorization = `Bearer ${returnedAccessToken}`

              failedRequestQueue.forEach((request) => request.onSuccess(returnedAccessToken))
              failedRequestQueue = []
            })
            .catch((err) => {
              failedRequestQueue.forEach((request) => request.onFailure(err))
              failedRequestQueue = []

              signOut()
            })
            .finally(() => {
              isRefreshing = false
            })
        }
        return await new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`
              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      }

      return await Promise.reject(error)
    }
  )

  return api
}

export const api = setupAPIClient()
