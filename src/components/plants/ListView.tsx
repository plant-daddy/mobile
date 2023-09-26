import { Image, View, type ViewProps } from 'react-native'
import { Select, SelectOption, Text, Title } from '../global'
import { MaterialIcons } from '@expo/vector-icons'
import { PlantsList } from './PlantsList'
import { HorizontalInset } from '@/theme/dimension'
import { colors, fonts } from '@/theme'
import { Link, router } from 'expo-router'
import { getPlantFirstName, type Plant } from '@/utils/plant'

export const ListView = ({
  backgroundColor,
  textColor,
  title,
  count,
  plants,
  isUserPlant,
  disabled,
  ...rest
}: {
  title: string
  textColor: string
  backgroundColor: string
  count?: boolean
  plants: Plant[]
  isUserPlant?: boolean
  disabled?: boolean
} & ViewProps) => (
  <View
    style={[
      {
        backgroundColor,
        borderRadius: 16,
        paddingHorizontal: HorizontalInset
      },
      rest.style
    ]}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
      }}>
      <Title style={{ color: textColor }}>{title}</Title>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Select
          searchableProps={['botanicalName', 'commonName', 'type']}
          data={plants ?? []}
          selectedValueLabel={''}
          value={''}
          renderAs={<MaterialIcons name="search" size={20} color={textColor} />}
          onSelect={(value) => {
            router.push(`/plants/${isUserPlant ? 'user/' : ''}${value}`)
          }}
          inputLabel="*Search by: botanical name, common name or type"
          renderItem={({ item }) => (
            <SelectOption value={item.id}>
              <View style={{ alignItems: 'flex-start', gap: 8, flexDirection: 'row' }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 80, height: 80, borderRadius: 16 }}
                />
                <Text
                  style={{
                    fontFamily: fonts.rubik300,
                    fontSize: 18,
                    flexShrink: 1
                  }}>
                  {getPlantFirstName(item.commonName)}
                </Text>
              </View>
            </SelectOption>
          )}
        />
        {isUserPlant && (
          <Link href="/new-plant" asChild>
            <MaterialIcons name="add-circle-outline" size={20} color={textColor} />
          </Link>
        )}
      </View>
    </View>
    {count && (
      <Text style={{ color: colors.green.dark, marginBottom: 4 }}>
        You have {plants.length} plants!
      </Text>
    )}
    <PlantsList
      textColor={textColor}
      plants={plants}
      isUserPlant={isUserPlant}
      disabled={disabled}
    />
  </View>
)
