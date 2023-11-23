import { useAuth } from '@/contexts/auth'
import { api as apiUrl } from '@/utils/env'
import axios, { type AxiosInstance } from 'axios'
import React, { createContext, useContext } from 'react'

interface ApiContextData {
  api: AxiosInstance
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData)

export const ApiProvider = ({ children }: React.PropsWithChildren) => {
  const { accessToken } = useAuth()

  const api = axios.create({
    baseURL: apiUrl(),
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  // api.interceptors.request.use(
  //   (config) => {
  //     if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  //     return config
  //   },
  //   async (error) => await Promise.reject(error)
  // )

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // const originalRequest = error.config

      console.error(JSON.stringify(error.toJSON(), null, 2))

      // if (error?.response?.status === 401 && !originalRequest._retry) {
      //   originalRequest._retry = true

      //   try {
      //     const {
      //       data: { accessToken: returnedAccessToken, refreshToken: returnedRefreshToken }
      //     } = await api.post('/refresh', {
      //       refreshToken
      //     })

      //     await setTokens({
      //       accessToken: returnedAccessToken,
      //       refreshToken: returnedRefreshToken
      //     })

      //     originalRequest.headers.Authorization = `Bearer ${returnedAccessToken}`

      //     return await api(originalRequest)
      //   } catch (err) {
      //     console.error(JSON.stringify(isAxiosError(err) ? err.toJSON() : err, null, 2))
      //     signOut()
      //   }
      // }

      // return await Promise.reject(error)
    }
  )

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>
}

export function useApi(): ApiContextData {
  const context = useContext(ApiContext)

  if (!context) throw new Error('useApi must be used within an ApiProvider.')

  return context
}
