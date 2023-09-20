import { Plant } from '@/components/plants'
import { usePlant } from '@/hooks'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

export default function PlantDetails() {
  const { plant } = useLocalSearchParams()

  const { data } = usePlant(plant as string)

  if (!data) return <></>

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: HorizontalInset,
        paddingVertical: VerticalInset
      }}>
      <Plant {...data} />
    </ScrollView>
  )
}
