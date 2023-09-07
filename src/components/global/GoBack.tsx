import { GoBackSVG } from '@/assets/svg/goBack'
import { router } from 'expo-router'
import { Pressable } from 'react-native'

export const GoBack = () => (
  <Pressable
    onPress={() => {
      router.back()
    }}>
    <GoBackSVG />
  </Pressable>
)
