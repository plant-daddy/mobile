import { Notification, Plants } from '@/assets/svg'
import { Button, Text, Title } from '@/components/global'
import { BenefitCard } from '@/components/settings'
import { useApi } from '@/contexts/api'
import { useUser } from '@/hooks'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { Image, ScrollView, View } from 'react-native'

export default function Pro() {
  const { api } = useApi()
  const { data } = useUser(api)

  // const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()

  // useEffect(() => {
  //   ;(async () => {
  //     await initPaymentSheet({
  //       customerId: data?.id,

  //     })
  //   })()
  // })

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: HorizontalInset,
        marginTop: VerticalInset + 16,
        gap: 32
      }}>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 16 }}>
        <Image source={require('../../../assets/images/name.png')} />
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

      <Title>Get exclusive benefits with Plant Daddy Pro</Title>

      <View style={{ gap: 16 }}>
        <Title>Premium benefits</Title>
        <BenefitCard Image={() => <Plants />} title="Unlimited plants" />
        <BenefitCard Image={() => <Notification />} title="Unlimited notifications" />
      </View>

      <Text color={colors.green.dark} style={{ textAlign: 'center', fontSize: 16 }}>
        $10. You pay once and get access for life.
      </Text>

      <Button primary disabled={data?.pro}>
        {data?.pro ? 'Benefits already acquired' : 'Buy now'}
      </Button>
    </ScrollView>
  )
}
