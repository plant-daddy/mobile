/* eslint-disable multiline-ternary */
import { colors, fonts } from '@/theme'
import { HorizontalInset } from '@/theme/dimension'
import { type Plant, getPlantFirstName } from '@/utils/plant'
import { MaterialIcons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import { ActivityIndicator, Image, View, type ViewProps } from 'react-native'

import { Button, Select, SelectOption, Text, Title } from '../global'
import { PlantsList } from './PlantsList'

export const ListView = ({
  backgroundColor,
  textColor,
  title,
  count,
  plants,
  isUserPlant,
  disabled,
  loading,
  fetchNextPage,
  ...rest
}: {
  title: string
  textColor: string
  backgroundColor: string
  count?: boolean
  plants: Plant[]
  isUserPlant?: boolean
  disabled?: boolean
  loading: boolean
  fetchNextPage: () => void
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
    {count && plants.length > 0 && (
      <Text style={{ color: colors.green.dark, marginBottom: 4 }}>
        You have {plants.length} plants!
      </Text>
    )}
    {plants.length === 0 && isUserPlant && (
      <View style={{ alignSelf: 'center', gap: 8 }}>
        <Text>You have no plants yet</Text>
        <Link href="/new-plant" asChild>
          <Button primary>Add plant</Button>
        </Link>
      </View>
    )}
    {loading && <ActivityIndicator color={textColor} />}
    {plants.length > 0 && (
      <PlantsList
        textColor={textColor}
        plants={plants}
        isUserPlant={isUserPlant}
        disabled={disabled}
        fetchNextPage={fetchNextPage}
      />
    )}
  </View>
)
