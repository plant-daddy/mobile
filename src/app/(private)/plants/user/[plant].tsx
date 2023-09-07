import { Plant } from '@/components/plants'
import { useUserPlant } from '@/hooks'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

export default function PlantDetails() {
  const { plant } = useLocalSearchParams()

  const { data } = useUserPlant(plant)

  if (!data) return <></>

  return (
    <View>
      <Plant {...data} name={data.name} />
    </View>
  )
}
