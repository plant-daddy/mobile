import { ProCallout } from '@/components/global'
import { AddPlant } from '@/components/plants'
import { useModal, useUser, useUserPlants } from '@/hooks'
import { View } from 'react-native'

export default function NewPlant() {
  const { data: user } = useUser()
  const { data: plants } = useUserPlants()

  const { isOpen, onOpen, onClose } = useModal()

  const canCreatePlant = !!user?.pro || !!((plants ?? []).length < 1)

  return (
    <View style={{ marginVertical: 64, alignItems: 'center' }}>
      <AddPlant
        title="Add new plant"
        onSubmit={() => {
          if (!canCreatePlant) onOpen()
        }}
      />
      <ProCallout benefit="plant" isVisible={isOpen} onClose={onClose} />
    </View>
  )
}
