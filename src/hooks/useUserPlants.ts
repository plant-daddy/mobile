import { plants } from '@/utils/plant'
import { useQuery } from '@tanstack/react-query'

export const useUserPlants = () =>
  useQuery({
    queryKey: ['userPlants'],
    queryFn: () => {
      return plants
    }
  })
