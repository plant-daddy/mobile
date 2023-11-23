import { type APIResponse } from '@/service/api'
import { type Plant } from '@/utils/plant'
import { useQuery } from '@tanstack/react-query'
import { type AxiosInstance } from 'axios'

export const useUserPlant = (id: string, api: AxiosInstance) =>
  useQuery({
    queryKey: ['userPlant'],
    queryFn: async () => {
      const plant = (
        await api.get<APIResponse<{ plant: Plant; id: number; nickname?: string }>>(
          `/userPlant/${id}`
        )
      ).data.result.data

      return { ...plant.plant, id: plant.id, nickname: plant.nickname }
    }
  })
