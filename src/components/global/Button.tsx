import { colors } from '@/theme'
import React from 'react'
import {
  Text,
  type TouchableHighlightProps,
  type TextStyle,
  type StyleProp,
  Pressable
} from 'react-native'

type ButtonProps = TouchableHighlightProps & {
  children: React.ReactNode
  textStyle?: StyleProp<TextStyle>
  primary?: boolean
}

export const Button = ({ children, primary, textStyle, disabled, ...rest }: ButtonProps) => (
  <Pressable
    {...rest}
    disabled={disabled}
    style={({ pressed }) => [
      {
        opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding: 16
      },
      {
        ...(primary && { backgroundColor: colors.green.light }),
        ...(rest.style as Object)
      }
    ]}>
    <Text
      style={[
        {
          ...(primary && {
            color: colors.white.primary
          })
        },
        textStyle
      ]}>
      {children}
    </Text>
  </Pressable>
)
