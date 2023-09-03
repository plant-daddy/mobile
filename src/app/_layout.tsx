import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'

import { Rubik_300Light, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik'
import { Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito'
import { colors } from '@/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
// import { AuthProvider } from '@/contexts/auth'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'carousel'
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    // <AuthProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="carousel">
        <Stack.Screen name="carousel" options={{ headerShown: false }} />
        <Stack.Screen name="auth/signin" options={{ headerShown: false }} />
        <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
    // </AuthProvider>
  )
}
