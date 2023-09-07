import { Plant } from '@/components/plants'
import { usePlant } from '@/hooks'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

export default function PlantDetails() {
  const { plant } = useLocalSearchParams()

  const { data } = usePlant(plant as string)

  if (!data) return <></>

  return (
    <View>
      <Plant {...data} />
    </View>
  )
}
