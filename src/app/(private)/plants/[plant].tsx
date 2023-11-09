import { Plant } from '@/components/plants'
import { useApi } from '@/contexts/api'
import { usePlant } from '@/hooks'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, ScrollView } from 'react-native'

export default function PlantDetails() {
  const { plant } = useLocalSearchParams()

  const { api } = useApi()

  const { data } = usePlant(plant as string, api)

  if (!data) return <ActivityIndicator color={colors.green.dark} />

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
