import { Button, GoBack, Title } from '@/components/global'
import { SettingsItem } from '@/components/settings'
import { useAuth } from '@/contexts/auth'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { ScrollView, View } from 'react-native'

export default function Settings() {
  const { signOut } = useAuth()

  return (
    <View
      style={{
        paddingHorizontal: HorizontalInset,
        paddingTop: VerticalInset,
        marginBottom: 128,
        height: '100%'
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <GoBack />
        <Title style={{ alignSelf: 'center' }}>Settings</Title>
        <View />
      </View>

      <ScrollView style={{ marginVertical: 32 }}>
        <SettingsItem icon="person" text="Account" onPress={() => {}} />
        <SettingsItem icon="help-outline" text="FAQ" onPress={() => {}} dividerTop external />
        <SettingsItem
          icon="auto-awesome"
          text="Subscription"
          onPress={() => {}}
          dividerTop
          external
        />
      </ScrollView>

      <View
        style={{
          flexGrow: 1,
          justifyContent: 'flex-end'
        }}>
        <Button
          style={{
            backgroundColor: colors.red.primary,
            marginVertical: 16
          }}
          textStyle={{ color: colors.white.primary }}
          onPress={() => {
            signOut()
          }}>
          Sign out
        </Button>
      </View>
    </View>
  )
}
