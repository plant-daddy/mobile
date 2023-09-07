import { plants } from '@/utils/plant'
import { useQuery } from '@tanstack/react-query'

export const usePlant = (id: string) =>
  useQuery({
    queryKey: ['plant'],
    queryFn: () => {
      return plants.find((p) => p.id === id)
    }
  })
