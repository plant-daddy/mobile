import { View, type ViewProps } from 'react-native'
import { Text, Title } from '../global'
import { MaterialIcons } from '@expo/vector-icons'
import { PlantsList } from './PlantsList'
import { HorizontalInset } from '@/theme/dimension'
import { colors } from '@/theme'
import { Link } from 'expo-router'
import { plants } from '@/utils/plant'

export const ListView = ({
  backgroundColor,
  textColor,
  title,
  canAddPlant,
  count,
  ...rest
}: {
  title: string
  textColor: string
  backgroundColor: string
  canAddPlant?: boolean
  count?: boolean
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
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
      }}>
      <Title style={{ color: textColor }}>{title}</Title>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <MaterialIcons name="search" size={20} color={textColor} />
        {canAddPlant && (
          <Link href="/tabs/new-plant" asChild>
            <MaterialIcons name="add-circle-outline" size={20} color={textColor} />
          </Link>
        )}
      </View>
    </View>
    {count && <Text style={{ color: colors.green.dark }}>You have {plants.length} plants!</Text>}
    <PlantsList textColor={textColor} plants={plants} />
  </View>
)
