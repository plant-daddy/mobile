import { type APIResponse } from '@/service/api'
import { type Plant } from '@/utils/plant'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type AxiosInstance } from 'axios'

export const useUserPlants = (api: AxiosInstance) =>
  useInfiniteQuery({
    queryKey: ['userPlants'],
    queryFn: async ({ pageParam = 1 }) => {
      const plants = (
        await api.get<APIResponse<{ plants: Plant[]; count: number }>>('/plant/list', {
          params: { page: pageParam, limit: 30 }
        })
      ).data.result.data

      return {
        plants: plants.plants,
        count: plants.count,
        nextPage: pageParam + 1
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.plants.length < 30) return
      return lastPage.nextPage
    }
  })
