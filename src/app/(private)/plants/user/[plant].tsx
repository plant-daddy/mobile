import { Button } from '@/components/global'
import { Plant } from '@/components/plants'
import { useApi } from '@/contexts/api'
import { useUserPlant } from '@/hooks'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { Link, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, ScrollView } from 'react-native'

export default function PlantDetails() {
  const { plant } = useLocalSearchParams()

  const { api } = useApi()

  const { data } = useUserPlant(plant as string, api)

  if (!data) return <ActivityIndicator color={colors.green.dark} />

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: HorizontalInset,
        paddingVertical: VerticalInset
      }}>
      <Plant {...data} />
      <Link
        asChild
        href={{
          pathname: '/add-reminder',
          params: {
            name: data.nickname ?? data.commonName,
            image:
              data.image ??
              'https://www.ikea.com/us/en/images/products/fejka-artificial-potted-plant-indoor-outdoor-monstera__0614197_pe686822_s5.jpg'
          }
        }}>
        <Button primary style={{ marginTop: 16 }}>
          Add reminder
        </Button>
      </Link>
    </ScrollView>
  )
}
