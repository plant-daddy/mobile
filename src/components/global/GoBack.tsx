import { GoBackSVG } from '@/assets/svg/goBack'
import { router } from 'expo-router'
import { Pressable, type PressableProps } from 'react-native'

export const GoBack = ({ ...rest }: PressableProps) => (
  <Pressable
    {...rest}
    onPress={() => {
      router.back()
    }}>
    <GoBackSVG />
  </Pressable>
)
