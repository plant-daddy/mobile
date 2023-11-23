import { startCase } from 'lodash'

export interface Plant {
  description: string
  botanicalName: string
  commonName: string
  plantType?: string
  matureSize?: string
  sunExposure?: string
  soilType?: string
  soilPh?: string
  bloomTime?: string
  flowerColor?: string
  hardinessZones?: string
  nativeArea?: string
  light: string
  soil: string
  water: string
  temperatureAndHumidity: string
  fertilizer: string
  image?: string
  toxicity?: string
  id: number
  createdAt: string
  updatedAt: string
  nickname?: string
}
export const getPlantFirstName = (string: string) => string.split(',')[0]

export function getPlanInfo(plant: Partial<Plant>): {
  texts: Record<string, string | undefined>
  table: Record<string, string>
} {
  const { description, water, fertilizer, soil, light, temperatureAndHumidity, id, ...table } =
    plant

  return {
    texts: {
      'More about it': description,
      Water: water,
      Fertilize: fertilizer,
      Soil: soil,
      Light: light,
      'Temperature and humidity': temperatureAndHumidity
    },
    table: Object.fromEntries(Object.entries(table).map(([k, v]) => [startCase(k), v]))
  }
}
