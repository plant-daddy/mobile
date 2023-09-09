import { Button } from '@/components/global'
import { Plant } from '@/components/plants'
import { useUserPlant } from '@/hooks'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { Link, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

export default function PlantDetails() {
  const { plant } = useLocalSearchParams()

  const { data } = useUserPlant(plant as string)

  if (!data) return <></>

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: HorizontalInset,
        paddingVertical: VerticalInset
      }}>
      <Plant {...data} name={data.name} />
      <Link asChild href={`/add-reminder?name=${data.name}&image=${data.image}`}>
        <Button primary style={{ marginTop: 16 }}>
          Add reminder
        </Button>
      </Link>
    </ScrollView>
  )
}
