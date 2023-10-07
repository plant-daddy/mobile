import { Button, Input, Text, Title } from '@/components/global'
import { useAuth } from '@/contexts/auth'
import { ScreenHeight, ScreenWidth } from '@/theme/dimension'
import { Link } from 'expo-router'
import { Image, Pressable, View } from 'react-native'

export default function SignIn() {
  const { signIn } = useAuth()

  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: 64
      }}>
      <Image
        source={require('../../../assets/images/sign-in.png')}
        style={{
          maxHeight: ScreenHeight * 0.4
        }}
        resizeMode="contain"
      />
      <View style={{ width: ScreenWidth - 64, gap: 12 }}>
        <Title style={{ marginVertical: 8 }}>Login</Title>
        <Input placeholder="Email" />
        <Input secureTextEntry placeholder="Password" />
        <Button
          primary
          onPress={async () => {
            await signIn({ email: 'aehu', password: '123456' })
          }}>
          Login
        </Button>

        <Link href="/signup" asChild>
          <Pressable style={{ alignSelf: 'center' }}>
            <Text>Sign up</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}
