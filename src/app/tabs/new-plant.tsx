import { AddPlant } from '@/components/plants/AddPlant'
import { View } from 'react-native'

export default function NewPlant() {
  return (
    <View style={{ marginVertical: 64, alignItems: 'center' }}>
      <AddPlant title="Add new plant" />
    </View>
  )
}
