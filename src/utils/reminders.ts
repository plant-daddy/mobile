import { type Plant } from './plant'

export type Frequency = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface Reminder {
  plantId: string
  frequency: Frequency
  interval: number
  type: 'water' | 'fertilize'
}

export type FullReminder = Reminder & { plant: Plant }
