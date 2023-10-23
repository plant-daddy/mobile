import { plants } from '@/utils/plant'
import { useQuery } from '@tanstack/react-query'

export const useUserPlant = (id: number) =>
  useQuery({
    queryKey: ['userPlant'],
    queryFn: async () => {
      // const { api } = useApi()

      // const plants = (
      //   await api.get<
      //     APIResponse<{ userPlants: Array<{ plant: Plant; id: number }>; count: number }>
      //   >('/userPlants', {
      //     params: { page: pageParam, limit: 30 }
      //   })
      // ).data.result.data

      const plant = plants.find((p) => p.id === id)

      return plant ? { ...plant, name: 'Minha planta daora' } : undefined
    }
  })
