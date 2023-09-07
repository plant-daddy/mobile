import { View } from 'react-native'
import { AddPlant as AddPlantSvg } from '@/assets/svg'
import { Button, Input, Select, SelectOption, Text, Title } from '../global'
import { useState } from 'react'
import { plants } from '@/utils/plant'

export const AddPlant = ({ title }: { title: string }) => {
  const [selectedValue, setSelectedValue] = useState()

  return (
    <View>
      <AddPlantSvg />
      <Title style={{ marginBottom: 12 }}>{title}</Title>
      <View style={{ gap: 8 }}>
        <Select
          searchableProps={['name']}
          placeholder="Plant"
          data={plants}
          selectedValueLabel={plants.find((p) => p.id === selectedValue)?.name ?? ''}
          value={selectedValue}
          onSelect={(value) => {
            setSelectedValue(value)
          }}
          renderItem={({ item }) => <SelectOption value={item.id}>{item.name}</SelectOption>}
        />
        <Input placeholder="Nickname (optional)" />
        <Button primary>Add Plant</Button>
      </View>
    </View>
  )
}
