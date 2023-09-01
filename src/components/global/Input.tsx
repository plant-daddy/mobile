import { colors } from '@/theme'
import { ScreenWidth } from '@/theme/dimension'
import React from 'react'
import { StyleSheet, TextInput, type TextInputProps } from 'react-native'

type InputProps = TextInputProps

const style = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.green.light,
    paddingHorizontal: 15
  }
})

export const Input = (props: InputProps) => (
  <TextInput {...props} style={[style.input, props.style]} />
)
