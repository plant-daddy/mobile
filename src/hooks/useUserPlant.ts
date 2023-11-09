import { type APIResponse } from '@/service/api'
import { type Plant } from '@/utils/plant'
import { useQuery } from '@tanstack/react-query'
import { type AxiosInstance } from 'axios'

export const useUserPlant = (id: string, api: AxiosInstance) =>
  useQuery({
    queryKey: ['userPlant'],
    queryFn: async () => {
      const plant = (await api.get<APIResponse<Plant & { nickname: string }>>(`/plant/${id}`)).data
        .result.data

      return plant
    }
  })
