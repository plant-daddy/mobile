import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function PrivateLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Slot />
    </>
  )
}
