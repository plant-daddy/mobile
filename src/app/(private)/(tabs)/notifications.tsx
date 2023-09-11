import { Water, Fertilize } from '@/assets/svg'
import { CheckableButton, Text, Title } from '@/components/global'
import { Reminder } from '@/components/reminders'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { MaterialIcons } from '@expo/vector-icons'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { type Reminder as ReminderType } from '@/utils/reminders'
import { ScrollView } from 'react-native-gesture-handler'
import notifee from '@notifee/react-native'

const loadNotifications = async () => {
  const res = await notifee.getTriggerNotifications()
  return res.map((r) => r.notification.data) as unknown as ReminderType[]
}

export default function Notifications() {
  const [waterChecked, setWaterChecked] = useState(true)
  const [fertilizeChecked, setFertilizeChecked] = useState(true)

  // const [refresh, setRefresh] = useState(false)

  const [reminders, setReminders] = useState<ReminderType[]>([])

  useEffect(() => {
    loadNotifications()
      .then((res) => {
        setReminders(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const waterReminders = useMemo(() => reminders.filter((r) => r.type === 'water'), [reminders])

  const fertilizeReminders = useMemo(
    () => reminders.filter((r) => r.type === 'fertilize'),
    [reminders]
  )

  const scrollRef = useRef(null)

  const remove = useCallback(async (notificationId: string) => {
    await notifee.cancelTriggerNotification(notificationId)
    setReminders((reminders) => reminders.filter((r) => r.notificationId !== notificationId))
  }, [])

  // const onRefresh = () => {
  //   setRefresh(true)

  //   loadNotifications()
  //     .then((res) => {
  //       setReminders(res)
  //       setRefresh(false)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  return (
    <View
      // refreshControl={
      //   <RefreshControl refreshing={refresh} onRefresh={onRefresh} style={{ paddingTop: 24 }} />
      // }
      style={{
        paddingHorizontal: HorizontalInset,
        paddingTop: VerticalInset,
        marginBottom: 128
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>MY REMINDERS</Title>
        <MaterialIcons name="search" size={20} color={colors.green.dark} />
      </View>
      <Text>
        You have {reminders.length} reminder{reminders.length !== 1 && 's'}
      </Text>
      <View style={{ flexDirection: 'row', gap: 16, marginVertical: 24 }}>
        <CheckableButton
          checked={waterChecked}
          onToggle={setWaterChecked}
          style={{ backgroundColor: colors.labels.water.backgroundColor }}
          textStyle={{ color: colors.labels.water.color }}
          icon={Water}>
          Water
        </CheckableButton>
        <CheckableButton
          checked={fertilizeChecked}
          onToggle={setFertilizeChecked}
          style={{ backgroundColor: colors.labels.fertilize.backgroundColor }}
          textStyle={{ color: colors.labels.fertilize.color }}
          icon={Fertilize}>
          Fertilize
        </CheckableButton>
      </View>
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {waterChecked &&
          waterReminders.map((reminder) => (
            <Reminder
              {...reminder}
              onRemove={remove}
              key={reminder.notificationId}
              simultaneousHandlers={scrollRef}
            />
          ))}
        {fertilizeChecked &&
          fertilizeReminders.map((reminder) => (
            <Reminder
              {...reminder}
              onRemove={remove}
              key={reminder.notificationId}
              simultaneousHandlers={scrollRef}
            />
          ))}
      </ScrollView>
    </View>
  )
}
