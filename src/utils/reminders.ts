import { type DateTime } from 'luxon'

export type Frequency = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface Reminder {
  id: string
  name: string
  image: string
  frequency: Frequency
  interval: number
  type: 'water' | 'fertilize'
  nextReminder: DateTime
}
