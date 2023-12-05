import { type APIResponse } from '@/service/api'
import { useQuery } from '@tanstack/react-query'
import { type AxiosInstance } from 'axios'

export const useUser = (api: AxiosInstance) =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return (
        await api.get<
          APIResponse<{
            id: string
            email: string
            username: string
            profilePicture?: string
            subscribed: boolean
          }>
        >('/user')
      ).data.result.data
    }
  })
