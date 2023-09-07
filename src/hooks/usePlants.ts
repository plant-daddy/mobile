import { plants } from '@/utils/plant'
import { useQuery } from '@tanstack/react-query'

export const usePlants = () =>
  useQuery({
    queryKey: ['plants'],
    queryFn: () => {
      return plants
    }
  })
