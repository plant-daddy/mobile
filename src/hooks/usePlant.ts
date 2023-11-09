import { type APIResponse } from '@/service/api'
import { type Plant } from '@/utils/plant'
import { useQuery } from '@tanstack/react-query'
import { type AxiosInstance } from 'axios'

export const usePlant = (id: string, api: AxiosInstance) =>
  useQuery({
    queryKey: ['plant', id],
    queryFn: async () => {
      const plant = (await api.get<APIResponse<Plant>>(`/plant/${id}`)).data.result.data

      return plant
    }
  })
