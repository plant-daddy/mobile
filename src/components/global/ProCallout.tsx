import { View } from 'react-native'
import { Text } from './Text'
import { Button } from './Button'
import { HorizontalInset } from '@/theme/dimension'
import { colors, fonts } from '@/theme'
import { Link } from 'expo-router'

const benefits = {
  plant: 'Get Plant Daddy Pro to be able to create unlimited plants',
  notification: 'Get Plant Daddy Pro to be able to create unlimited notifications'
}

export const ProCallout = ({ benefit }: { benefit: keyof typeof benefits }) => (
  <View
    style={{
      marginHorizontal: HorizontalInset,
      borderWidth: 1,
      borderRadius: 16,
      padding: 16,
      borderColor: colors.green.dark,
      backgroundColor: colors.green.dark,
      gap: 12
    }}>
    <Text style={{ fontSize: 16, fontFamily: fonts.rubik400, color: colors.white.primary }}>
      Oops. Seems like you {"don't"} have Plant Daddy Pro 😥
    </Text>
    <Text style={{ color: colors.white.primary }}>{benefits[benefit]}</Text>
    <Link href="/settings/pro" asChild>
      <Button primary>Get Plant Daddy Pro</Button>
    </Link>
  </View>
)
