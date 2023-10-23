import { type APIResponse } from '@/service/api'
import { type Plant } from '@/utils/plant'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type AxiosInstance } from 'axios'

export const useUserPlants = (api: AxiosInstance) =>
  useInfiniteQuery({
    queryKey: ['userPlants'],
    queryFn: async ({ pageParam = 1 }) => {
      const plants = (
        await api.get<
          APIResponse<{ userPlants: Array<{ plant: Plant; id: number }>; count: number }>
        >('/userPlants', {
          params: { page: pageParam, limit: 30 }
        })
      ).data.result.data

      return {
        plants: plants.userPlants.map((plant) => ({ ...plant.plant, id: plant.id })),
        count: plants.count,
        nextPage: pageParam + 1
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.plants.length < 30) return
      return lastPage.nextPage
    }
  })
