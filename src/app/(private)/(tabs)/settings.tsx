import { Button, GoBack, Title } from '@/components/global'
import { SettingsItem } from '@/components/settings'
import { useAuth } from '@/contexts/auth'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { web } from '@/utils/env'
import { router } from 'expo-router'
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
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <GoBack style={{ position: 'absolute', left: 1 }} />
        <Title style={{ alignSelf: 'center' }}>Settings</Title>
      </View>

      <ScrollView style={{ marginVertical: 32 }}>
        <SettingsItem
          icon="person"
          text="Account"
          onPress={() => {
            router.push('/settings/account')
          }}
        />
        <SettingsItem
          icon="help-outline"
          text="FAQ"
          onPress={() => {
            router.push({
              pathname: '/settings/webview',
              params: {
                url: `${web()}/faq`
              }
            })
          }}
          dividerTop
          external
        />
        <SettingsItem
          icon="auto-awesome"
          text="Plant Daddy Pro"
          onPress={() => {
            router.push('/settings/pro')
          }}
          dividerTop
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
