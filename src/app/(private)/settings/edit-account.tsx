import {
  Button,
  DatePicker,
  GoBack,
  ImagePicker,
  Input,
  Select,
  SelectOption,
  TimePicker,
  Title
} from '@/components/global'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { ScrollView, View } from 'react-native'
import { Formik, type FormikProps } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useUser } from '@/hooks'

const validationSchema = z.object({
  name: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  image: z.string()
})

export type AccountSchema = z.infer<typeof validationSchema>

export default function EditAccount() {
  const { data } = useUser()

  if (!data) return <></>

  const submit = async (data: AccountSchema) => {
    // await scheduleReminder(data)
    // router.push('/notifications')
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
        initialValues={{
          name: data.name,
          confirmPassword: '',
          password: '',
          image: data.image
        }}
        onSubmit={submit}
        validateOnMount
        validationSchema={toFormikValidationSchema(validationSchema)}>
        {({
          values,
          handleChange,
          handleSubmit,
          isValid,
          isSubmitting
        }: FormikProps<AccountSchema>) => (
          <View style={{ width: '100%', gap: 16, marginTop: 24 }}>
            <ImagePicker defaultValue={values.image} />

            <Input label="Name" value={values.name} onChangeText={handleChange('name')} />
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
              disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}
