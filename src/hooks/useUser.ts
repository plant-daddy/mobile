import { useQuery } from '@tanstack/react-query'

export const useUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return {
        id: '1',
        name: 'Lívia Belizário',
        email: 'liviabelirocha@outlook.com',
        pro: false,
        image:
          'https://cdn.vox-cdn.com/thumbor/bJUCH2dq0tLyFhpdGmK6oolGNbY=/0x0:3000x4500/1200x675/filters:focal(1247x1135:1727x1615)/cdn.vox-cdn.com/uploads/chorus_image/image/66616682/KE_208_GG_1205_2809_RT.0.jpg'
      }
    }
  })
