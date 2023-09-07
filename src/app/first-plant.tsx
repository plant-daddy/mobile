import { Text } from '@/components/global'
import { AddPlant } from '@/components/plants/AddPlant'
import { HorizontalInset } from '@/theme/dimension'
import { Link } from 'expo-router'
import { Pressable, View } from 'react-native'

export default function FirstPlant() {
  return (
    <View style={{ marginVertical: 64, alignItems: 'center', marginHorizontal: HorizontalInset }}>
      <AddPlant title="Let's start by adding your first plant" />

      <Link href="/tabs" asChild>
        <Pressable style={{ alignSelf: 'center', marginTop: 16 }}>
          <Text>Skip this step</Text>
        </Pressable>
      </Link>
    </View>
  )
}
