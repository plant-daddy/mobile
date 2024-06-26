import { colors } from '@/theme'
import { Slot } from 'expo-router'
import { StatusBar } from 'react-native'

export default function PrivateLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white.primary} />
      <Slot />
    </>
  )
}
