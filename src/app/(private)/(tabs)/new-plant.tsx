import { ProCallout } from '@/components/global'
import { AddPlant } from '@/components/plants'
import { useApi } from '@/contexts/api'
import { useModal, useUser, useUserPlants } from '@/hooks'
import { View } from 'react-native'

export default function NewPlant() {
  const { api } = useApi()

  const { data: user } = useUser(api)
  const { data: plants } = useUserPlants(api)

  const { isOpen, onOpen, onClose } = useModal()

  const canCreatePlant = !!user?.pro || !!(plants?.pages[0]?.count ?? 0 < 1)

  return (
    <View style={{ marginVertical: 64, alignItems: 'center' }}>
      <AddPlant
        title="Add new plant"
        beforeSubmit={() => {
          if (!canCreatePlant) onOpen()
        }}
      />
      <ProCallout benefit="plant" isVisible={isOpen} onClose={onClose} />
    </View>
  )
}
