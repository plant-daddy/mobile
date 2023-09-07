import { Image, Pressable, View } from 'react-native'
import { Text } from '../global'
import { ScrollView } from 'react-native-gesture-handler'
import { getPlantFirstName, type Plant } from '@/utils/plant'
import { Link } from 'expo-router'

export const PlantsList = ({
  plants,
  textColor,
  isUserPlant
}: {
  plants: Plant[]
  textColor?: string
  isUserPlant?: boolean
}) => (
  <ScrollView style={{ marginBottom: 64 }}>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {plants.map((plant) => (
        <Link
          href={`/plants/${isUserPlant ? 'user/' : ''}${plant.id}`}
          asChild
          key={plant.id}
          style={{ alignItems: 'center', margin: 8 }}>
          <Pressable style={({ hovered, pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
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
