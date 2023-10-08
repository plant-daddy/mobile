import { Button, GoBack, Input, Text, Title } from '@/components/global'
import { useAuth } from '@/contexts/auth'
import { ScreenWidth } from '@/theme/dimension'
import { Link } from 'expo-router'
import { Formik, type FormikProps } from 'formik'
import { Image, KeyboardAvoidingView, Pressable, View } from 'react-native'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const validationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(10, { message: 'Password must be at least 10 characters' }),
  username: z.string({ required_error: 'Name is required' })
})

export type SignUpSchema = z.infer<typeof validationSchema>

export default function SignUp() {
  const { signUp } = useAuth()

  const submit = async (data: SignUpSchema) => {
    await signUp(data)
  }

  return (
    <KeyboardAvoidingView style={{ marginHorizontal: 32, marginVertical: 64 }} behavior="position">
      <GoBack />
      <Image
        source={require('../../../assets/images/sign-up.png')}
        style={{
          maxWidth: ScreenWidth * 0.8,
          alignSelf: 'center'
        }}
        resizeMode="contain"
      />
      <View style={{ gap: 8 }}>
        <Title style={{ marginTop: 8 }}>Sign up</Title>
        <Text style={{ alignSelf: 'center' }}>Create your account</Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
            username: ''
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
          }: FormikProps<SignUpSchema>) => (
            <>
              <Input
                placeholder="Name"
                value={values.username}
                onChangeText={handleChange('username')}
                error={errors.username}
              />
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
                style={{ width: 'auto' }}
                onPress={() => {
                  handleSubmit()
                }}
                isLoading={isSubmitting}
                disabled={!isValid}>
                Sign up
              </Button>
            </>
          )}
        </Formik>
        <Link href="/signin" asChild>
          <Pressable style={{ alignSelf: 'center' }}>
            <Text>Login</Text>
          </Pressable>
        </Link>
      </View>
    </KeyboardAvoidingView>
  )
}
