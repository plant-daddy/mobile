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
      <Plant {...data} name={data.nickname} />
      <Link
        asChild
        href={{ pathname: '/add-reminder', params: { name: data.nickname, image: data.image } }}>
        <Button primary style={{ marginTop: 16 }}>
          Add reminder
        </Button>
      </Link>
    </ScrollView>
  )
}
