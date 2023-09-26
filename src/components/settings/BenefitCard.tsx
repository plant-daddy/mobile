import { ProCardPattern } from '@/assets/svg'
import { colors } from '@/theme'
import { View } from 'react-native'
import { Title } from '../global'
import React from 'react'

export const BenefitCard = ({
  Image,
  title
}: {
  title: string
  Image: () => React.JSX.Element
}) => (
  <View
    style={{
      backgroundColor: colors.green.light,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 8,
      position: 'relative'
    }}>
    <ProCardPattern style={{ position: 'absolute' }} />
    <Image />
    <Title style={{ fontSize: 16, flexShrink: 1 }} numberOfLines={2}>
      {title}
    </Title>
  </View>
)
