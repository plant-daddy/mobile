import { Image, View } from 'react-native'
import { AddPlant as AddPlantSvg } from '@/assets/svg'
import { Button, Input, Select, SelectOption, Text, Title } from '../global'
import { useState } from 'react'
import { getPlantFirstName } from '@/utils/plant'
import { usePlants } from '@/hooks'
import { fonts } from '@/theme'

export const AddPlant = ({ title, onSubmit }: { title: string; onSubmit?: () => void }) => {
  const { data } = usePlants()
  const [selectedValue, setSelectedValue] = useState()

  return (
    <View>
      <AddPlantSvg style={{ alignSelf: 'center' }} />
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
                    fontFamily: item.id === selectedValue ? fonts.rubik400 : fonts.rubik300,
                    fontSize: 18,
                    flexShrink: 1
                  }}>
                  {getPlantFirstName(item.commonName)}
                </Text>
              </View>
            </SelectOption>
          )}
        />
        <Input placeholder="Nickname (optional)" />
        <Button
          primary
          onPress={() => {
            if (onSubmit) onSubmit()
          }}>
          Add Plant
        </Button>
      </View>
    </View>
  )
}
