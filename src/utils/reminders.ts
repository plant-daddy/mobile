const type = <const>['water', 'fertilize']
const frequency = <const>['hourly', 'daily', 'weekly', 'monthly', 'yearly']

export type Frequency = (typeof frequency)[number]

export interface Reminder {
  notificationId: string
  name: string
  image: string
  frequency: Frequency
  interval: number
  type: (typeof type)[number]
  nextReminder: string
}

export { type as reminderTypeReadonly, frequency as reminderFrequencyReadonly }
