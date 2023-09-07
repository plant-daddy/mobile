import { colors, fonts } from '@/theme'
import React from 'react'
import { StyleSheet, TextInput, type TextInputProps } from 'react-native'

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

export const Input = (props: InputProps) => (
  <TextInput {...props} style={[style.input, props.style]} placeholderTextColor={colors.gray.mid} />
)
