import { type Plant, getPlantFirstName } from '@/utils/plant'
import { Link } from 'expo-router'
import { Image, Pressable, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { Text } from '../global'

export const PlantsList = ({
  plants,
  textColor,
  isUserPlant,
  disabled
}: {
  plants: Plant[]
  textColor?: string
  isUserPlant?: boolean
  disabled?: boolean
}) => (
  <ScrollView style={{ marginBottom: 64 }} scrollEnabled={!disabled}>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {plants.map((plant) => (
        <Link
          href={`/plants/${isUserPlant ? 'user/' : ''}${plant.id}`}
          asChild
          key={plant.id}
          style={{ alignItems: 'center', margin: 8 }}>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
            <Image
              source={{ uri: plant.image }}
              style={{ width: 120, height: 150, borderRadius: 16 }}
            />
            <Text {...(textColor && { style: { color: textColor } })}>
              {getPlantFirstName(plant.commonName)}
            </Text>
          </Pressable>
        </Link>
      ))}
    </View>
  </ScrollView>
)
