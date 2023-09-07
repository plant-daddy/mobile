import { Button, GoBack, Input, Text, Title } from '@/components/global'
import { ScreenWidth } from '@/theme/dimension'
import { Link } from 'expo-router'
import { Image, View, Pressable } from 'react-native'

export default function SignUp() {
  return (
    <View style={{ marginHorizontal: 32, marginVertical: 64 }}>
      <GoBack />
      <Image
        source={require('../../assets/images/sign-up.png')}
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
        <Link href="/first-plant" asChild>
          <Button primary style={{ width: 'auto' }}>
            Sign up
          </Button>
        </Link>
        <Link href="/auth/signin" asChild>
          <Pressable style={{ alignSelf: 'center' }}>
            <Text>Login</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}
