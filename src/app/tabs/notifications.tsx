import { Water, Fertilize } from '@/assets/svg'
import { CheckableButton, Text, Title } from '@/components/global'
import { Reminder } from '@/components/reminders'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { MaterialIcons } from '@expo/vector-icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { type FullReminder } from '@/utils/reminders'
import { ScrollView } from 'react-native-gesture-handler'

const reminders: FullReminder[] = [
  {
    plantId: '1',
    frequency: 'weekly',
    type: 'water',
    interval: 2,
    plant: {
      id: '1',
      name: 'plant1',
      image:
        'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
    }
  },
  {
    plantId: '2',
    frequency: 'monthly',
    type: 'fertilize',
    interval: 4,
    plant: {
      id: '1',
      name: 'plant 2',
      image:
        'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
    }
  },
  {
    plantId: '6',
    frequency: 'weekly',
    type: 'water',
    interval: 2,
    plant: {
      id: '1',
      name: 'plant1',
      image:
        'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
    }
  },
  {
    plantId: '3',
    frequency: 'monthly',
    type: 'fertilize',
    interval: 4,
    plant: {
      id: '1',
      name: 'plant 2',
      image:
        'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
    }
  },
  {
    plantId: '4',
    frequency: 'weekly',
    type: 'water',
    interval: 2,
    plant: {
      id: '1',
      name: 'plant1',
      image:
        'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
    }
  },
  {
    plantId: '5',
    frequency: 'monthly',
    type: 'fertilize',
    interval: 4,
    plant: {
      id: '1',
      name: 'plant 2',
      image:
        'https://multimidia.gazetadopovo.com.br/media/info/2017/201710/plantas-problemas-saudavel.png'
    }
  }
]

export default function Notifications() {
  const [waterChecked, setWaterChecked] = useState(true)
  const [fertilizeChecked, setFertilizeChecked] = useState(true)

  const [filteredReminders, setFilteredReminders] = useState(
    reminders.filter(
      (r) => (r.type === 'water' && waterChecked) || (r.type === 'fertilize' && fertilizeChecked)
    )
  )

  const scrollRef = useRef(null)

  const remove = useCallback((plantId: string) => {
    setFilteredReminders((filteredReminders) =>
      filteredReminders.filter((r) => r.plantId !== plantId)
    )
  }, [])

  useEffect(() => {
    setFilteredReminders(() =>
      reminders.filter(
        (r) => (r.type === 'water' && waterChecked) || (r.type === 'fertilize' && fertilizeChecked)
      )
    )
  }, [waterChecked, fertilizeChecked])

  return (
    <View
      style={{ paddingHorizontal: HorizontalInset, paddingTop: VerticalInset, marginBottom: 188 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>MY REMINDERS</Title>
        <MaterialIcons name="search" size={20} color={colors.green.dark} />
      </View>
      <Text>
        You have {filteredReminders.length} reminder{filteredReminders.length !== 1 && 's'}
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
        {filteredReminders.map((reminder) => (
          <Reminder
            {...reminder}
            onRemove={remove}
            key={reminder.plantId}
            simultaneousHandlers={scrollRef}
          />
        ))}
      </ScrollView>
    </View>
  )
}
