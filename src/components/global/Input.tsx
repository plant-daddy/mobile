import { colors, fonts } from '@/theme'
import React from 'react'
import { TextInput, type TextInputProps, View } from 'react-native'

import { Text } from './Text'

type InputProps = TextInputProps & {
  error?: string
}

export const Input = ({
  label,
  error,
  ...props
}: InputProps & {
  label?: string
}) => (
  <View>
    {label && (
      <Text
        style={{
          fontFamily: fonts.rubik400,
          fontSize: 18,
          color: colors.green.dark,
          marginBottom: 8
        }}>
        {label}
      </Text>
    )}
    <TextInput
      {...props}
      style={[
        {
          borderWidth: 1,
          borderRadius: 5,
          borderColor: colors.green.light,
          paddingHorizontal: 16,
          paddingVertical: 8,
          fontFamily: fonts.rubik300,
          color: colors.green.dark
        },
        props.style
      ]}
      placeholderTextColor={colors.gray.mid}
    />
    {error && (
      <Text
        style={{
          fontFamily: fonts.rubik400,
          color: colors.red.primary,
          marginBottom: 8
        }}>
        {error}
      </Text>
    )}
  </View>
)
