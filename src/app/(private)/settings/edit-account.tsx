import { Button, GoBack, ImagePicker, Input, Title } from '@/components/global'
import { useApi } from '@/contexts/api'
import { useUser } from '@/hooks'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { useNavigation } from 'expo-router'
import { Formik, type FormikProps } from 'formik'
import { ScrollView, View } from 'react-native'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const validationSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  image: z.string().optional()
})

export type AccountSchema = z.infer<typeof validationSchema>

export default function EditAccount() {
  const { api } = useApi()

  const { goBack } = useNavigation()

  const { data, refetch } = useUser(api)

  if (!data) return <></>

  const submit = async (data: AccountSchema) => {
    await api.patch('/user', data)
    await refetch()
    goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: HorizontalInset,
        paddingVertical: VerticalInset
      }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Title style={{ alignSelf: 'center' }}>Account</Title>
        <GoBack style={{ position: 'absolute', left: 1 }} />
      </View>
      <Formik
        initialValues={{ username: data.username }}
        onSubmit={submit}
        validateOnMount
        validationSchema={toFormikValidationSchema(validationSchema)}>
        {({
          values,
          handleChange,
          setFieldValue,
          handleSubmit,
          isValid,
          isSubmitting
        }: FormikProps<AccountSchema>) => (
          <View style={{ width: '100%', gap: 16, marginTop: 24 }}>
            <ImagePicker
              defaultValue={data.image ?? ''}
              onChange={async (e) => await setFieldValue('image', e)}
            />

            <Input label="Name" value={values.username} onChangeText={handleChange('username')} />
            <Input
              label="Password"
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
            />
            <Input
              label="Confirm new password"
              placeholder="Confirm password"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
            />

            <Button
              onPress={() => {
                handleSubmit()
              }}
              primary
              disabled={!isValid}
              isLoading={isSubmitting}>
              Save
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}
