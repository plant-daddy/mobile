import { colors, fonts } from '@/theme'
import React from 'react'
import { Text as NativeText, type TextProps as NativeTextProps, StyleSheet } from 'react-native'

interface TextProps extends NativeTextProps {
  children: React.ReactNode
  color?: string
}

const style = StyleSheet.create({
  text: {
    fontFamily: fonts.rubik300,
    color: colors.green.dark,
    fontSize: 14,
    textAlign: 'justify'
  }
})

export const Text = ({ children, color, ...rest }: TextProps) => (
  <NativeText {...rest} style={[style.text, { color }, rest.style]}>
    {children}
  </NativeText>
)
