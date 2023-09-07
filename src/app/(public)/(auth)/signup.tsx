import { Button, GoBack, Input, Text, Title } from '@/components/global'
import { useAuth } from '@/contexts/auth'
import { ScreenWidth } from '@/theme/dimension'
import { Link } from 'expo-router'
import { Image, View, Pressable } from 'react-native'

export default function SignUp() {
  const { signUp } = useAuth()

  return (
    <View style={{ marginHorizontal: 32, marginVertical: 64 }}>
      <GoBack />
      <Image
        source={require('../../../assets/images/sign-up.png')}
        style={{
          maxWidth: ScreenWidth * 0.8,
          alignSelf: 'center'
        }}
        resizeMode="contain"
      />
      <View style={{ width: ScreenWidth - 64, gap: 8 }}>
        <Title style={{ marginTop: 8 }}>Sign up</Title>
        <Text style={{ alignSelf: 'center' }}>Create your account</Text>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input secureTextEntry placeholder="Password" />
        <Button
          primary
          style={{ width: 'auto' }}
          onPress={async () => {
            await signUp({ email: 'aehu', password: '123456', name: 'John' })
          }}>
          Sign up
        </Button>
        <Link href="/signin" asChild>
          <Pressable style={{ alignSelf: 'center' }}>
            <Text>Login</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}
