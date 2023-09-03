import { View, type ViewProps } from 'react-native'
import { Title } from '../global'
import { MaterialIcons } from '@expo/vector-icons'
import { PlantsList } from './PlantsList'
import { HorizontalInset } from '@/theme/dimension'

export const ListView = ({
  backgroundColor,
  textColor,
  title,
  canAddPlant,
  ...rest
}: {
  title: string
  textColor: string
  backgroundColor: string
  canAddPlant?: boolean
} & ViewProps) => (
  <View
    style={[
      {
        backgroundColor,
        borderRadius: 16,
        paddingHorizontal: HorizontalInset
      },
      rest.style
    ]}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Title style={{ color: textColor }}>{title}</Title>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <MaterialIcons name="search" size={20} color={textColor} />
        {canAddPlant && <MaterialIcons name="add-circle-outline" size={20} color={textColor} />}
      </View>
    </View>
    <PlantsList
      textColor={textColor}
      plants={[
        {
          id: '1',
          imageURI:
            'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png',
          name: 'Planta 1'
        },
        {
          id: '2',
          imageURI:
            'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png',
          name: 'Planta 2'
        },
        {
          id: '3',
          imageURI:
            'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png',
          name: 'Planta 3'
        },
        {
          id: '4',
          imageURI:
            'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png',
          name: 'Planta 4'
        },
        {
          id: '5',
          imageURI:
            'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png',
          name: 'Planta 5'
        },
        {
          id: '6',
          imageURI:
            'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png',
          name: 'Planta 6'
        },
        {
          id: '7',
          imageURI:
            'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png',
          name: 'Planta 7'
        },
        {
          id: '8',
          imageURI:
            'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png',
          name: 'Planta 8'
        },
        {
          id: '9',
          imageURI:
            'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png',
          name: 'Planta 9'
        }
      ]}
    />
  </View>
)
