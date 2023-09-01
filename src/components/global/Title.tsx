import { colors, fonts } from '@/theme'
import React from 'react'
import { StyleSheet, Text, type TextProps } from 'react-native'

interface TitleProps extends TextProps {
  children?: React.ReactNode
}

export const style = StyleSheet.create({
  title: {
    fontFamily: fonts.rubik700,
    color: colors.green.dark,
    fontSize: 24,
    textAlign: 'center',
    margin: 10
  }
})

export const Title = ({ children, ...rest }: TitleProps) => (
  <Text {...rest} style={[style.title, rest.style]}>
    {children}
  </Text>
)
