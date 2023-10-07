import { colors, fonts } from '@/theme'
import React from 'react'
import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native'

import { Text } from './Text'

type InputProps = TextInputProps

const style = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.green.light,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: fonts.rubik300,
    color: colors.green.dark
  }
})

export const Input = ({
  label,
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
      style={[style.input, props.style]}
      placeholderTextColor={colors.gray.mid}
    />
  </View>
)
