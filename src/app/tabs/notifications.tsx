import { Water, Fertilize } from '@/assets/svg'
import { CheckableButton, Text, Title } from '@/components/global'
import { Reminder } from '@/components/reminders'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { MaterialIcons } from '@expo/vector-icons'
import { useCallback, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { type Reminder as ReminderType } from '@/utils/reminders'
import { ScrollView } from 'react-native-gesture-handler'
import { DateTime } from 'luxon'

const notifications: ReminderType[] = [
  {
    id: '1',
    nextReminder: DateTime.now().plus({ days: 4 }),
    frequency: 'weekly',
    type: 'water',
    interval: 2,
    name: 'plant1',
    image:
      'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
  },
  {
    id: '2',
    nextReminder: DateTime.now().plus({ minutes: 5 }),
    frequency: 'monthly',
    type: 'fertilize',
    interval: 4,
    name: 'plant 2',
    image:
      'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
  },
  {
    id: '6',
    nextReminder: DateTime.now().plus({ hours: 3 }),
    frequency: 'weekly',
    type: 'water',
    interval: 2,
    name: 'plant1',
    image:
      'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
  },
  {
    id: '3',
    nextReminder: DateTime.now().plus({ hours: 3 }),
    frequency: 'monthly',
    type: 'fertilize',
    interval: 4,
    name: 'plant 2',
    image:
      'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
  },
  {
    id: '4',
    nextReminder: DateTime.now().plus({ hours: 3 }),
    frequency: 'weekly',
    type: 'water',
    interval: 2,
    name: 'plant1',
    image:
      'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
  },
  {
    id: '5',
    nextReminder: DateTime.now().plus({ hours: 3 }),
    frequency: 'monthly',
    type: 'fertilize',
    interval: 4,
    name: 'plant 2',
    image:
      'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
  }
]

export default function Notifications() {
  const [waterChecked, setWaterChecked] = useState(true)
  const [fertilizeChecked, setFertilizeChecked] = useState(true)

  const [reminders, setReminders] = useState(notifications)

  const waterReminders = useMemo(() => reminders.filter((r) => r.type === 'water'), [reminders])

  const fertilizeReminders = useMemo(
    () => reminders.filter((r) => r.type === 'fertilize'),
    [reminders]
  )

  const scrollRef = useRef(null)

  const remove = useCallback((plantId: string) => {
    setReminders((reminders) => reminders.filter((r) => r.id !== plantId))
  }, [])

  return (
    <View
      style={{ paddingHorizontal: HorizontalInset, paddingTop: VerticalInset, marginBottom: 128 }}>
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
              key={reminder.id}
              simultaneousHandlers={scrollRef}
            />
          ))}
        {fertilizeChecked &&
          fertilizeReminders.map((reminder) => (
            <Reminder
              {...reminder}
              onRemove={remove}
              key={reminder.id}
              simultaneousHandlers={scrollRef}
            />
          ))}
      </ScrollView>
    </View>
  )
}
