import { type APIResponse } from '@/service/api'
import { type Plant } from '@/utils/plant'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type AxiosInstance } from 'axios'

export const usePlants = (api: AxiosInstance) =>
  useInfiniteQuery({
    queryKey: ['plants'],
    queryFn: async ({ pageParam = 1 }) => {
      const plants = (
        await api.get<APIResponse<{ plants: Plant[] }>>('/plants', {
          params: { page: pageParam, limit: 30 }
        })
      ).data.result.data.plants

      return {
        plants,
        nextPage: pageParam + 1
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.plants.length < 30) return undefined
      return lastPage.nextPage
    }
  })
