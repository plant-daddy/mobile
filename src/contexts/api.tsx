import { useAuth } from '@/contexts/auth'
import { api as apiUrl } from '@/utils/env'
import axios, { type AxiosError, type AxiosInstance } from 'axios'
import React, { createContext, useContext } from 'react'

let isRefreshing = false
let failedRequestQueue: any[] = []

interface ApiContextData {
  api: AxiosInstance
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData)

export const ApiProvider = ({ children }: React.PropsWithChildren) => {
  const { signOut, accessToken, refreshToken, setTokens } = useAuth()

  const api = axios.create({
    baseURL: apiUrl(),
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    async (error: AxiosError) => {
      console.error(JSON.stringify(error, null, 2))

      if (error?.response?.status === 401) {
        const originalConfig = error.config!

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('/refresh', {
              refreshToken
            })
            .then(async (response) => {
              const { accessToken: returnedAccessToken, refreshToken: returnedRefreshToken } =
                response.data

              await setTokens({
                accessToken: returnedAccessToken,
                refreshToken: returnedRefreshToken
              })

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

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>
}

export function useApi(): ApiContextData {
  const context = useContext(ApiContext)

  if (!context) throw new Error('useApi must be used within an ApiProvider.')

  return context
}
