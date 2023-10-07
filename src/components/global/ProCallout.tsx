import { colors } from '@/theme'
import { Link } from 'expo-router'
import { Image, View } from 'react-native'
import Modal from 'react-native-modal'

import { Button } from './Button'
import { Text } from './Text'
import { Title } from './Title'

const benefits = {
  plant: [
    'Looks like you exceed the limit of plants you can add.',
    'Get Plant Daddy Pro to be able to add more'
  ],
  notification: [
    'Looks like you exceed the limit of notifications you can have.',
    'Get Plant Daddy Pro to be able to have more'
  ]
}

export const ProCallout = ({
  benefit,
  isVisible,
  onClose
}: {
  benefit: keyof typeof benefits
  isVisible: boolean
  onClose: () => void
}) => (
  <Modal isVisible={isVisible} style={{ height: '45%' }} onBackdropPress={onClose}>
    <View
      style={{
        borderRadius: 16,
        padding: 32,
        gap: 16,
        backgroundColor: colors.white.primary
      }}>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 16 }}>
        <Image source={require('../../assets/images/name.png')} />
        <Text
          style={{
            backgroundColor: colors.green.light,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
            fontSize: 16
          }}
          color={colors.white.primary}>
          Pro
        </Text>
      </View>
      <View style={{ gap: 8, alignItems: 'center' }}>
        <Title>Oops.</Title>
        {benefits[benefit].map((b) => (
          <Text key={b} style={{ textAlign: 'center', fontSize: 16 }}>
            {b}
          </Text>
        ))}
      </View>
      <Link href="/settings/pro" asChild>
        <Button primary>Buy Now</Button>
      </Link>
    </View>
  </Modal>
)
