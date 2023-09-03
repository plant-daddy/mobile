import { Button, GoBack, Input, Text, Title } from '@/components/global'
import { ScreenWidth } from '@/theme/dimension'
import { Link } from 'expo-router'
import { Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
        <Title>Sign up</Title>
        <Text style={{ alignSelf: 'center' }}>Create your account</Text>
        <Input placeholder="Name" style={{ padding: 8 }} />
        <Input placeholder="Email" style={{ padding: 8 }} />
        <Input secureTextEntry placeholder="Password" style={{ padding: 8 }} />
        <Button primary style={{ borderRadius: 4, padding: 16, width: 'auto' }}>
          Sign up
        </Button>
        <Link href="/auth/signin" asChild>
          <TouchableOpacity style={{ alignSelf: 'center' }}>
            <Text>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}
