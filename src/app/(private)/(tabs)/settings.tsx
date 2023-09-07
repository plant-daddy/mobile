import { Button, GoBack, Text, Title } from '@/components/global'
import { useAuth } from '@/contexts/auth'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { View } from 'react-native'

export default function Settings() {
  const { signOut } = useAuth()

  return (
    <View
      style={{
        paddingHorizontal: HorizontalInset,
        paddingTop: VerticalInset,
        marginBottom: 128
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <GoBack />
        <Title style={{ alignSelf: 'center' }}>Settings</Title>
        <View />
      </View>

      <Button
        style={{ backgroundColor: colors.red.primary, marginVertical: 16 }}
        textStyle={{ color: colors.white.primary }}
        onPress={() => {
          signOut()
        }}>
        Sign out
      </Button>
    </View>
  )
}
