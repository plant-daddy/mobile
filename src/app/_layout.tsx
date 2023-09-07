import { useFonts } from 'expo-font'
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'

import { Rubik_300Light, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik'
import { Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '@/contexts/auth'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

const InitialLayout = () => {
  const { authenticated, loading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    const inPrivateGroup = segments[0] === '(private)'

    if (authenticated && !inPrivateGroup) router.replace('/home')
    else if (!authenticated && inPrivateGroup) router.replace('/')
  }, [authenticated, segments[0]])

  return <Slot />
}

export default function RootLayout() {
  const queryClient = new QueryClient()

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

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </AuthProvider>
  )
}
