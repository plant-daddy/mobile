import { AddPlant as AddPlantSvg } from '@/assets/svg'
import { useApi } from '@/contexts/api'
import { usePlants, useUserPlants } from '@/hooks'
import { fonts } from '@/theme'
import { getPlantFirstName } from '@/utils/plant'
import { useRouter } from 'expo-router'
import { Formik, type FormikProps } from 'formik'
import { useState } from 'react'
import { Image, View } from 'react-native'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { Button, Input, Select, SelectOption, Text, Title } from '../global'

const validationSchema = z.object({
  plantId: z.string(),
  nickname: z.string().optional()
})

export type PlantSchema = z.infer<typeof validationSchema>

export const AddPlant = ({ title, beforeSubmit }: { title: string; beforeSubmit?: () => void }) => {
  const { api } = useApi()

  const { data } = usePlants(api)
  const { refetch } = useUserPlants(api)
  const [selectedValue, setSelectedValue] = useState()

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
    <View>
      <AddPlantSvg style={{ alignSelf: 'center' }} />
      <Title style={{ marginBottom: 12 }}>{title}</Title>
      <View style={{ gap: 8 }}>
        <Formik
          initialValues={{
            plantId: ''
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
            errors
          }: FormikProps<PlantSchema>) => (
            <>
              <Text>{JSON.stringify(errors)}</Text>
              <Select
                searchableProps={['botanicalName', 'commonName', 'type']}
                placeholder="Plant"
                data={data?.pages.flatMap((item) => item.plants) ?? []}
                selectedValueLabel={getPlantFirstName(
                  (data?.pages.flatMap((item) => item.plants) ?? []).find(
                    (p) => p.id === selectedValue
                  )?.commonName ?? ''
                )}
                value={values.plantId}
                onSelect={async (value) => {
                  setSelectedValue(value)
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
                          fontFamily: item.id === selectedValue ? fonts.rubik400 : fonts.rubik300,
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
                onPress={() => {
                  if (beforeSubmit) beforeSubmit()
                  handleSubmit()
                }}
                disabled={!isValid}
                isLoading={isSubmitting}>
                Add Plant
              </Button>
            </>
          )}
        </Formik>
      </View>
    </View>
  )
}
