import { type ReminderSchema } from '@/app/(private)/add-reminder'
import { getFrequency } from '@/utils/rrule'
import notifee, {
  AndroidImportance,
  type TimestampTrigger,
  TriggerType
} from '@notifee/react-native'
import { DateTime } from 'luxon'
import uuid from 'react-native-uuid'
import { RRule } from 'rrule'

export const createNotificationChannel = async () => {
  await notifee.requestPermission()

  return await notifee.createChannel({
    id: 'reminder',
    name: 'Reminders'
  })
}

export const scheduleReminder = async (data: ReminderSchema) => {
  const channel = await createNotificationChannel()

  const { year, month, day } = DateTime.fromJSDate(data.date)
  const { hour, minute } = DateTime.fromJSDate(data.time)
  const startTime = DateTime.fromObject({
    year,
    month,
    day,
    hour,
    minute
  })

  const nextReminder = new RRule({
    freq: getFrequency(data.frequency),
    interval: +data.interval,
    dtstart: startTime.toJSDate(),
    count: 2
  }).all()[1]

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: nextReminder.getTime()
  }

  try {
    const id = uuid.v4().toString()

    await notifee.createTriggerNotification(
      {
        title: '🌱 Check on your plant',
        body: `It's time to take care of ${data.name}`,
        android: {
          channelId: channel,
          showTimestamp: true,
          importance: AndroidImportance.HIGH,
          sound: 'default'
        },
        id,
        data: {
          ...data,
          interval: +data.interval,
          nextReminder: DateTime.fromJSDate(nextReminder).toISO() ?? '',
          notificationId: id
        }
      },
      trigger
    )
  } catch (err) {
    console.error(err)
  }

  console.log(await notifee.getTriggerNotifications())
}
