import { colors } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, type PressableProps } from 'react-native'

export const GoBack = ({ ...rest }: PressableProps) => (
  <Pressable
    {...rest}
    onPress={() => {
      router.back()
    }}>
    <MaterialIcons name="arrow-back-ios" size={24} color={colors.green.dark} />
  </Pressable>
)
