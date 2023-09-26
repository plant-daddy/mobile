import { colors, fonts } from '@/theme'
import React from 'react'
import { View } from 'react-native'
import { Text } from '../global'

export const AccountItem = ({ name, value }: { name: string; value: string }) => (
  <View>
    <Text
      style={{
        fontFamily: fonts.rubik400,
        fontSize: 18,
        color: colors.green.dark,
        marginBottom: 8
      }}>
      {name}
    </Text>
    <Text>{value}</Text>
  </View>
)
