import { type Plant as PlantType, getPlantFirstName } from '@/utils/plant'
import { Link } from 'expo-router'
import { memo } from 'react'
import { Image, Pressable } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { Text } from '../../global'

const Plant = memo(function Plant({
  plant,
  isUserPlant,
  textColor
}: {
  isUserPlant?: boolean
  plant: PlantType
  textColor?: string
}) {
  return (
    <Link
      href={`/plants/${isUserPlant ? 'user/' : ''}${plant.id}`}
      asChild
      style={{ alignItems: 'center', margin: 16 }}>
      <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, flex: 1 / 2 }]}>
        <Image
          source={{ uri: plant.image }}
          style={{ width: 120, height: 150, borderRadius: 16 }}
        />
        <Text {...(textColor && { style: { color: textColor } })}>
          {isUserPlant && plant.nickname ? plant.nickname : getPlantFirstName(plant.commonName)}
        </Text>
      </Pressable>
    </Link>
  )
})

export const PlantsList = ({
  plants,
  disabled,
  fetchNextPage,
  ...rest
}: {
  plants: PlantType[]
  textColor?: string
  isUserPlant?: boolean
  disabled?: boolean
  fetchNextPage: () => void
}) => (
  <FlatList
    data={plants}
    key={'#'}
    keyExtractor={(plant) => `#${plant.id}`}
    numColumns={2}
    scrollEnabled={!disabled}
    onEndReached={fetchNextPage}
    style={{ marginBottom: 64 }}
    renderItem={({ item }) => <Plant plant={item} {...rest} />}
  />
)
