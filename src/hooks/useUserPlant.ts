import { plants } from '@/utils/plant'
import { useQuery } from '@tanstack/react-query'

export const useUserPlant = (id: string) =>
  useQuery({
    queryKey: ['userPlant'],
    queryFn: () => {
      const plant = plants.find((p) => p.id === id)

      return plant ? { ...plant, name: 'Minha planta daora' } : undefined
    }
  })
