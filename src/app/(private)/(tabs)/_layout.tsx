import { colors } from '@/theme'
import { ScreenHeight } from '@/theme/dimension'
import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.green.light,
          tabBarStyle: {
            height: ScreenHeight * 0.07,
            backgroundColor: colors.white.light
          },
          tabBarItemStyle: {
            paddingVertical: 8
          }
        }}>
        <Tabs.Screen
          name="home"
          options={{
            href: '(private)/(tabs)/home',
            title: 'Home',
            tabBarIcon: ({ size, color }) => <MaterialIcons name="home" size={size} color={color} />
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            href: '(private)/(tabs)/notifications',
            title: 'Notifications',
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="notifications" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="new-plant"
          options={{
            href: '(private)/(tabs)/new-plant',
            title: 'Add Plant',
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="local-florist" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            href: '(private)/(tabs)/settings',
            title: 'Settings',
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            )
          }}
        />
      </Tabs>
    </>
  )
}
