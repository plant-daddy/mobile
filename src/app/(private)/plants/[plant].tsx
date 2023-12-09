import { Plant } from '@/components/plants'
import { useApi } from '@/contexts/api'
import { usePlant } from '@/hooks'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, ScrollView } from 'react-native'

export default function PlantDetails() {
  const { plant } = useLocalSearchParams()

  const { api } = useApi()

  const { data } = usePlant(plant as string, api)

  if (!data) return <ActivityIndicator color={colors.green.dark} />

  const router = useRouter()

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: HorizontalInset,
        paddingVertical: VerticalInset
      }}>
      <Plant
        {...data}
        icon="library-add"
        onPress={() => {
          router.push(
            // @ts-expect-error
            `/new-plant?plant=${plant as string}`
          )
        }}
      />
    </ScrollView>
  )
}
