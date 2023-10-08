import { Button, GoBack, Title } from '@/components/global'
import { AccountItem } from '@/components/settings'
import { useApi } from '@/contexts/api'
import { useUser } from '@/hooks'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { router } from 'expo-router'
import { Image, ScrollView, View } from 'react-native'

export default function Account() {
  const { api } = useApi()

  const { data } = useUser(api)

  if (!data) return <></>

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: HorizontalInset,
        paddingVertical: VerticalInset
      }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <GoBack style={{ position: 'absolute', left: 1 }} />
        <Title style={{ alignSelf: 'center' }}>Account</Title>
      </View>

      <View style={{ width: '100%', gap: 16, marginTop: 24 }}>
        <Image
          source={{ uri: data.image }}
          style={{ width: 120, height: 120, borderRadius: 60, alignSelf: 'center' }}
        />
        <AccountItem name="Name" value={data.username} />
        <AccountItem name="Email" value={data.email} />
        <Button
          onPress={() => {
            router.push('/settings/edit-account')
          }}
          primary>
          Edit
        </Button>
      </View>
    </ScrollView>
  )
}
