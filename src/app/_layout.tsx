import { ApiProvider } from '@/contexts/api'
import { AuthProvider, useAuth } from '@/contexts/auth'
import { scheduleReminder } from '@/service/notifier'
import { colors } from '@/theme'
import { type Reminder } from '@/utils/reminders'
import { Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito'
import { Rubik_300Light, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik'
import notifee, { EventType } from '@notifee/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router'
import { setBackgroundColorAsync } from 'expo-system-ui'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

// eslint-disable-next-line @typescript-eslint/no-floating-promises
setBackgroundColorAsync(colors.white.primary)

const InitialLayout = () => {
  const { accessToken } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inPrivateGroup = segments[0] === '(private)'

    if (accessToken && !inPrivateGroup) router.replace('/home')
    else if (!accessToken && inPrivateGroup) router.replace('/')
  }, [accessToken, segments[0]])

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

  useEffect(() => {
    return notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.DELIVERED) {
        const data = detail.notification?.data as unknown as Reminder
        await scheduleReminder({
          ...data,
          date: DateTime.fromISO(data.nextReminder).toJSDate(),
          time: DateTime.fromISO(data.nextReminder).toJSDate(),
          interval: data.interval.toString()
        })
      }
    })
  }, [])

  if (!loaded) return null

  return (
    <AuthProvider>
      <ApiProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {/* <StripeProvider publishableKey="pk_test_51K1Xp8C9627s8ysgDCBxpllc567ZpjG7JK2wjLi3xwphbGG7gEOTonE7llZVaINZ3cyD7xYAHvw1JW5tnCa9gwCG00kr0CgFI4"> */}
            <InitialLayout />
            {/* </StripeProvider> */}
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ApiProvider>
    </AuthProvider>
  )
}
