import { Image, View } from 'react-native'
import { AddPlant as AddPlantSvg } from '@/assets/svg'
import { Button, Input, Select, SelectOption, Text, Title } from '../global'
import { useState } from 'react'
import { getPlantFirstName } from '@/utils/plant'
import { usePlants } from '@/hooks'
import { fonts } from '@/theme'

export const AddPlant = ({ title }: { title: string }) => {
  const { data } = usePlants()
  const [selectedValue, setSelectedValue] = useState()

  return (
    <View>
      <AddPlantSvg />
      <Title style={{ marginBottom: 12 }}>{title}</Title>
      <View style={{ gap: 8 }}>
        <Select
          searchableProps={['botanicalName', 'commonName', 'type']}
          placeholder="Plant"
          data={data ?? []}
          selectedValueLabel={getPlantFirstName(
            (data ?? []).find((p) => p.id === selectedValue)?.commonName ?? ''
          )}
          value={selectedValue}
          onSelect={(value) => {
            setSelectedValue(value)
          }}
          renderItem={({ item }) => (
            <SelectOption value={item.id}>
              <View style={{ alignItems: 'center', gap: 8 }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 80, height: 80, borderRadius: 16 }}
                />
                <Text
                  style={{
                    fontFamily: item.id === selectedValue ? fonts.rubik400 : fonts.rubik300
                  }}>
                  {getPlantFirstName(item.commonName)}
                </Text>
              </View>
            </SelectOption>
          )}
        />
        <Input placeholder="Nickname (optional)" />
        <Button primary>Add Plant</Button>
      </View>
    </View>
  )
}