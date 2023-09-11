import { RRule } from 'rrule'
import { type Frequency } from './reminders'

export const getFrequency = (frequency: Frequency) => {
  switch (frequency) {
    case 'every minute':
      return RRule.MINUTELY
    case 'hourly':
      return RRule.HOURLY
    case 'daily':
      return RRule.DAILY
    case 'weekly':
      return RRule.WEEKLY
    case 'monthly':
      return RRule.MONTHLY
    case 'yearly':
      return RRule.YEARLY
  }
}

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const getRecurrence = ({
  frequency,
  interval
}: {
  frequency: Frequency
  interval: number
}) => capitalizeFirstLetter(new RRule({ freq: getFrequency(frequency), interval }).toText())
