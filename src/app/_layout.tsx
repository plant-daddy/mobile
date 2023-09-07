import { useFonts } from 'expo-font'
import { Slot, SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'

import { Rubik_300Light, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik'
import { Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { AuthProvider } from '@/contexts/auth'

export { ErrorBoundary } from 'expo-router'

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
  const queryClient = new QueryClient()

  return (
    // <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </QueryClientProvider>
    // </AuthProvider>
  )
}
