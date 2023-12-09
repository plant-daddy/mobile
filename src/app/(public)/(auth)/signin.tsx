import { Button, Input, Text, Title } from '@/components/global'
import { useAuth } from '@/contexts/auth'
import { ScreenHeight } from '@/theme/dimension'
import { Link } from 'expo-router'
import { Formik, type FormikProps } from 'formik'
import { Image, Pressable, View } from 'react-native'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const validationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(10, { message: 'Password must be at least 10 characters' })
})

export type SignInSchema = z.infer<typeof validationSchema>

export default function SignIn() {
  const { signIn } = useAuth()

  const submit = async (data: SignInSchema) => {
    await signIn(data)
  }

  return (
    <View style={{ marginHorizontal: 32, marginVertical: 64 }}>
      <Image
        source={require('../../../assets/images/sign-in.png')}
        style={{
          maxHeight: ScreenHeight * 0.4,
          alignSelf: 'center'
        }}
        resizeMode="contain"
      />
      <View style={{ gap: 12, maxHeight: ScreenHeight * 0.6 }}>
        <Title style={{ marginVertical: 8 }}>Login</Title>
        <Formik
          initialValues={{
            email: 'workshop@email.com',
            password: '1234567890'
          }}
          onSubmit={submit}
          validationSchema={toFormikValidationSchema(validationSchema)}>
          {({
            values,
            handleChange,
            handleSubmit,
            isValid,
            isSubmitting,
            errors
          }: FormikProps<SignInSchema>) => (
            <>
              <Input
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                error={errors.email}
              />
              <Input
                secureTextEntry
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                error={errors.password}
              />
              <Button
                primary
                onPress={() => {
                  handleSubmit()
                }}
                isLoading={isSubmitting}
                disabled={!isValid}>
                Login
              </Button>

              <Link href="/signup" asChild>
                <Pressable style={{ alignSelf: 'center', padding: 4 }}>
                  <Text>Sign up</Text>
                </Pressable>
              </Link>
            </>
          )}
        </Formik>
      </View>
    </View>
  )
}
