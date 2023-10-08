import { type APIResponse } from '@/service/api'
import { useQuery } from '@tanstack/react-query'
import { type AxiosInstance } from 'axios'

export const useUser = (api: AxiosInstance) =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      return {
        ...(await api.get<APIResponse<{ id: string; email: string; username: string }>>('/user'))
          .data.result.data,
        pro: false,
        image:
          'https://cdn.vox-cdn.com/thumbor/bJUCH2dq0tLyFhpdGmK6oolGNbY=/0x0:3000x4500/1200x675/filters:focal(1247x1135:1727x1615)/cdn.vox-cdn.com/uploads/chorus_image/image/66616682/KE_208_GG_1205_2809_RT.0.jpg'
      }
    }
  })
