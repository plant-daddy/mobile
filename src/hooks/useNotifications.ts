import { type Reminder } from '@/utils/reminders'

import notifee from '@notifee/react-native'
import { useQuery } from '@tanstack/react-query'

export const useNotifications = () =>
  useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await notifee.getTriggerNotifications()
      return res.map((r) => r.notification.data) as unknown as Reminder[]
    }
  })
