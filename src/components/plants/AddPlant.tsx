import { AddPlant as AddPlantSvg } from '@/assets/svg'
import { useApi } from '@/contexts/api'
import { usePlants, useUserPlants } from '@/hooks'
import { fonts } from '@/theme'
import { getPlantFirstName } from '@/utils/plant'
import { useRouter } from 'expo-router'
import { Formik, type FormikProps } from 'formik'
import { Image, View } from 'react-native'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import {
  Button,
  Input,
  Select,
  SelectOption,
  Text,
  Title,
  WithTabKeyboardAvoidingView
} from '../global'

const validationSchema = z.object({
  plantId: z.string(),
  nickname: z.string().optional()
})

export type PlantSchema = z.infer<typeof validationSchema>

export const AddPlant = ({
  title,
  beforeSubmit,
  shouldSubmit = true,
  defaultPlant = ''
}: {
  title: string
  beforeSubmit?: () => void
  shouldSubmit?: boolean
  defaultPlant?: string
}) => {
  const { api } = useApi()

  const { data } = usePlants(api)
  const { refetch } = useUserPlants(api)

  const { push } = useRouter()

  const submit = async (data: PlantSchema) => {
    try {
      await api.post('/userPlant', data)
      await refetch()
      push('/home')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <WithTabKeyboardAvoidingView>
      <AddPlantSvg style={{ alignSelf: 'center' }} />
      <Title style={{ marginBottom: 12 }}>{title}</Title>
      <View style={{ gap: 8 }}>
        <Formik
          initialValues={{
            plantId: defaultPlant
          }}
          onSubmit={submit}
          validationSchema={toFormikValidationSchema(validationSchema)}>
          {({
            values,
            handleChange,
            handleSubmit,
            isValid,
            isSubmitting,
            setFieldValue,
            resetForm
          }: FormikProps<PlantSchema>) => (
            <>
              <Select
                searchableProps={['botanicalName', 'commonName', 'type']}
                placeholder="Plant"
                data={data?.pages.flatMap((item) => item.plants) ?? []}
                selectedValueLabel={getPlantFirstName(
                  (data?.pages.flatMap((item) => item.plants) ?? []).find(
                    (p) => p.id.toString() === values.plantId
                  )?.commonName ?? ''
                )}
                value={values.plantId}
                onSelect={async (value) => {
                  await setFieldValue('plantId', value.toString())
                }}
                inputLabel="*Search by: botanical name, common name or type"
                renderItem={({ item }) => (
                  <SelectOption value={item.id}>
                    <View style={{ alignItems: 'flex-start', gap: 8, flexDirection: 'row' }}>
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 80, height: 80, borderRadius: 16 }}
                      />
                      <Text
                        style={{
                          fontFamily:
                            String(item.id) === values.plantId ? fonts.rubik400 : fonts.rubik300,
                          fontSize: 18,
                          flexShrink: 1
                        }}>
                        {getPlantFirstName(item.commonName)}
                      </Text>
                    </View>
                  </SelectOption>
                )}
              />
              <Input
                placeholder="Nickname (optional)"
                onChangeText={handleChange('nickname')}
                value={values.nickname}
              />
              <Button
                primary
                onPress={async () => {
                  if (beforeSubmit) beforeSubmit()
                  if (shouldSubmit) handleSubmit()
                }}
                disabled={!isValid}
                isLoading={isSubmitting}>
                Add Plant
              </Button>
            </>
          )}
        </Formik>
      </View>
    </WithTabKeyboardAvoidingView>
  )
}
