import { Fertilize, Water } from '@/assets/svg'
import { CheckableButton, Text, Title } from '@/components/global'
import { Reminder } from '@/components/reminders'
import { useNotifications } from '@/hooks'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { MaterialIcons } from '@expo/vector-icons'
import notifee from '@notifee/react-native'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ScrollView as NativeScrollView, RefreshControl, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function Notifications() {
  const { data: reminders, refetch, isRefetching } = useNotifications()

  const [waterChecked, setWaterChecked] = useState(true)
  const [fertilizeChecked, setFertilizeChecked] = useState(true)

  const waterReminders = useMemo(() => reminders?.filter((r) => r.type === 'water'), [reminders])

  const fertilizeReminders = useMemo(
    () => reminders?.filter((r) => r.type === 'fertilize'),
    [reminders]
  )

  const scrollRef = useRef(null)

  const remove = useCallback(async (notificationId: string) => {
    await notifee.cancelTriggerNotification(notificationId)
    await refetch()
  }, [])

  return (
    <NativeScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} style={{ paddingTop: 24 }} />
      }
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
        You have {reminders?.length} reminder{reminders?.length !== 1 && 's'}
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
          waterReminders?.map((reminder) => (
            <Reminder
              {...reminder}
              onRemove={remove}
              key={reminder.notificationId}
              simultaneousHandlers={scrollRef}
            />
          ))}
        {fertilizeChecked &&
          fertilizeReminders?.map((reminder) => (
            <Reminder
              {...reminder}
              onRemove={remove}
              key={reminder.notificationId}
              simultaneousHandlers={scrollRef}
            />
          ))}
      </ScrollView>
    </NativeScrollView>
  )
}
