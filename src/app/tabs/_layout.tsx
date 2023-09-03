import { colors } from '@/theme'
import { ScreenHeight } from '@/theme/dimension'
import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="dark" />
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
            href: '/tabs/home',
            title: 'Home',
            tabBarIcon: ({ size, color }) => <MaterialIcons name="home" size={size} color={color} />
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            href: '/tabs/notifications',
            title: 'Notifications',
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="notifications" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="new-plant"
          options={{
            href: '/tabs/new-plant',
            title: '',
            tabBarIcon: () => (
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: -25,
                  backgroundColor: colors.green.light,
                  borderRadius: 30,
                  borderWidth: 3,
                  borderColor: colors.white.primary
                }}>
                <MaterialIcons name="add" size={30} color={colors.white.primary} />
              </TouchableOpacity>
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: '/tabs/profile',
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="person" size={size} color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            href: '/tabs/settings',
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
