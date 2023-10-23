/* eslint-disable multiline-ternary */
import {
  Button,
  DatePicker,
  GoBack,
  Input,
  ProCallout,
  Select,
  SelectOption,
  TimePicker,
  Title
} from '@/components/global'
import { useApi } from '@/contexts/api'
import { useModal, useNotifications, useUser } from '@/hooks'
import { scheduleReminder } from '@/service/notifier'
import { HorizontalInset, ScreenWidth, VerticalInset } from '@/theme/dimension'
import { reminderFrequencyReadonly, reminderTypeReadonly } from '@/utils/reminders'
import { router, useLocalSearchParams } from 'expo-router'
import { Formik, type FormikProps } from 'formik'
import { capitalize } from 'lodash'
import { DateTime } from 'luxon'
import { Image, ScrollView, View } from 'react-native'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const reminderType = ['water', 'fertilize']
const reminderFrequency = ['every minute', 'hourly', 'daily', 'weekly', 'monthly', 'yearly']

const validationSchema = z
  .object({
    image: z.string(),
    name: z.string(),
    frequency: z.enum(reminderFrequencyReadonly),
    interval: z.string().refine((value) => +value >= 1, {
      message: 'Interval cannot be smaller than 1'
    }),
    type: z.enum(reminderTypeReadonly),
    date: z
      .date()
      .refine(
        (value) =>
          DateTime.fromJSDate(value)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toMillis() >=
          DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toMillis(),
        {
          message: "Can't choose a date in the past"
        }
      ),
    time: z.date()
  })
  .refine(
    ({ date, time }) => {
      const { year, month, day } = DateTime.fromJSDate(date)
      const { hour, minute } = DateTime.fromJSDate(time)
      const chosenTime = DateTime.fromObject({
        year,
        month,
        day,
        hour,
        minute
      })

      return chosenTime.toMillis() >= DateTime.now().toMillis()
    },
    { message: "Can't choose a date in the past", path: ['time'] }
  )

export type ReminderSchema = z.infer<typeof validationSchema>

export default function AddReminder() {
  const plant = useLocalSearchParams<{
    image: string
    name: string
  }>()

  if (!plant.name || !plant.image) router.back()

  const { api } = useApi()

  const { data: user } = useUser(api)
  const { data: notifications } = useNotifications()
  const { isOpen, onClose, onOpen } = useModal()

  const canCreateReminder = !!user?.pro || !!((notifications ?? []).length < 1)

  const submit = async (data: ReminderSchema) => {
    await scheduleReminder(data)
    router.replace('/notifications')
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: HorizontalInset,
          paddingVertical: VerticalInset,
          alignItems: 'center'
        }}>
        <GoBack style={{ alignSelf: 'flex-start' }} />
        <Image
          source={require('../../assets/images/add-reminder.png')}
          style={{ width: ScreenWidth * 0.8 }}
          resizeMode="contain"
        />
        <Title style={{ marginBottom: 24 }}>Want to set reminders for {plant.name}?</Title>

        <Formik
          initialValues={{
            ...plant,
            frequency: 'daily',
            type: 'water',
            interval: '',
            date: DateTime.now().toJSDate(),
            time: DateTime.now().toJSDate()
          }}
          onSubmit={submit}
          validateOnMount
          validationSchema={toFormikValidationSchema(validationSchema)}>
          {({
            values,
            setFieldValue,
            handleChange,
            handleSubmit,
            isValid,
            isSubmitting
          }: FormikProps<ReminderSchema>) => (
            <View style={{ width: '100%', gap: 16 }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, gap: 16 }}>
                <Select
                  data={reminderType}
                  renderItem={(item) => {
                    return (
                      <SelectOption value={item.item}>
                        {capitalize(item.item as unknown as string)}
                      </SelectOption>
                    )
                  }}
                  selectedValueLabel={capitalize(reminderType.find((i) => i === values.type))}
                  value={values.type}
                  onSelect={async (value) => await setFieldValue('type', value)}
                  style={{ height: '30%' }}
                  label="Type"
                  inputStyle={{ flex: 1 }}
                />
                <Select
                  data={reminderFrequency}
                  renderItem={(item) => {
                    return (
                      <SelectOption value={item.item}>
                        {capitalize(item.item as unknown as string)}
                      </SelectOption>
                    )
                  }}
                  selectedValueLabel={capitalize(
                    reminderFrequency.find((i) => i === values.frequency)
                  )}
                  value={values.frequency}
                  onSelect={async (value) => await setFieldValue('frequency', value)}
                  style={{ height: '50%' }}
                  label="Frequency"
                  inputStyle={{ flex: 1 }}
                />
              </View>
              <Input
                label="Interval"
                placeholder="Type in the interval..."
                keyboardType="numeric"
                value={values.interval?.toString()}
                onChangeText={handleChange('interval')}
              />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, gap: 16 }}>
                <DatePicker
                  value={values.date}
                  onChange={async (value) => await setFieldValue('date', value)}
                  label="Starting date"
                />
                <TimePicker
                  value={values.time}
                  onChange={async (value) => await setFieldValue('time', value)}
                  label="Starting time"
                />
              </View>
              <Button
                onPress={() => {
                  if (!canCreateReminder) {
                    onOpen()
                    return
                  }
                  handleSubmit()
                }}
                primary
                disabled={!isValid || isSubmitting}>
                Set reminder
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
      <ProCallout benefit="notification" isVisible={isOpen} onClose={onClose} />
    </>
  )
}
