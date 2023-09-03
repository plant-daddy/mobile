import { Image, TouchableOpacity, View } from 'react-native'
import { Text } from '../global'
import { ScrollView } from 'react-native-gesture-handler'

export const PlantsList = ({
  plants,
  textColor
}: {
  plants: Array<{ name: string; imageURI: string; id: string }>
  textColor?: string
}) => (
  <ScrollView style={{ marginBottom: 64 }}>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {plants.map((plant) => (
        <TouchableOpacity key={plant.id} style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: plant.imageURI }}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
          <Text {...(textColor && { style: { color: textColor } })}>{plant.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
)
