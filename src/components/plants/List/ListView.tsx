import { fonts } from '@/theme'
import { HorizontalInset } from '@/theme/dimension'
import { type Plant, getPlantFirstName } from '@/utils/plant'
import { MaterialIcons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import { Image, View, type ViewProps } from 'react-native'

import { Select, SelectOption, Text, Title } from '../../global'

export const ListView = ({
  textColor,
  title,
  plants,
  isUserPlant,
  children,
  ...rest
}: {
  title: string
  textColor: string
  plants: Plant[]
  isUserPlant?: boolean
} & ViewProps) => (
  <View
    style={[
      {
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
    {children}
  </View>
)
