import { Notification, Plants } from '@/assets/svg'
import { Button, Text, Title } from '@/components/global'
import { BenefitCard } from '@/components/settings'
import { useApi } from '@/contexts/api'
import { useUser } from '@/hooks'
import { type APIResponse } from '@/service/api'
import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { usePaymentSheet } from '@stripe/stripe-react-native'
import { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, View } from 'react-native'

export default function Pro() {
  const [ready, setReady] = useState(false)

  const { api } = useApi()
  const { data, refetch } = useUser(api)

  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()

  useEffect(() => {
    void initializePaymentSheet()
  }, [])

  const initializePaymentSheet = async () => {
    const {
      data: {
        result: {
          data: { paymentIntentId }
        }
      }
    } = await api.post<APIResponse<{ paymentIntentId: string }>>('/payment', {
      amount: 1000
    })

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntentId,
      merchantDisplayName: 'Plant Daddy'
    })

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      setReady(true)
    }
  }

  async function buy() {
    const { error } = await presentPaymentSheet()

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      Alert.alert('Success', 'Payment confirmed!')
      await refetch()
      setReady(false)
    }
  }

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

      <Button primary disabled={data?.subscribed || !ready} onPress={buy} isLoading={loading}>
        {data?.subscribed ? 'Benefits already acquired' : 'Buy now'}
      </Button>
    </ScrollView>
  )
}
