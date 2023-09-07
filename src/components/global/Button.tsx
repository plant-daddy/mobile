import { colors } from '@/theme'
import React from 'react'
import {
  Text,
  type TouchableHighlightProps,
  StyleSheet,
  type TextStyle,
  type StyleProp,
  Pressable
} from 'react-native'

type ButtonProps = TouchableHighlightProps & {
  children: React.ReactNode
  textStyle?: StyleProp<TextStyle>
  primary?: boolean
}

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 16
  },
  primaryText: {
    color: colors.white.primary
  },
  linkText: {
    color: colors.green.dark,
    textDecorationLine: 'underline'
  }
})

export const Button = ({ children, primary, textStyle, ...rest }: ButtonProps) => (
  <Pressable
    {...rest}
    style={({ pressed }) => [
      style.button,
      {
        ...(primary && { backgroundColor: colors.green[pressed ? 'dark' : 'light'] }),
        ...(rest.style as Object)
      }
    ]}>
    <Text style={{ ...(primary && style.primaryText) }}>{children}</Text>
  </Pressable>
)
