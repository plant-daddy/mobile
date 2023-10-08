/* eslint-disable multiline-ternary */
import { colors } from '@/theme'
import React from 'react'
import {
  ActivityIndicator,
  Pressable,
  type StyleProp,
  Text,
  type TextStyle,
  type TouchableHighlightProps
} from 'react-native'

type ButtonProps = TouchableHighlightProps & {
  children: React.ReactNode
  textStyle?: StyleProp<TextStyle>
  primary?: boolean
  isLoading?: boolean
}

export const Button = ({
  children,
  primary,
  textStyle,
  disabled,
  isLoading,
  ...rest
}: ButtonProps) => (
  <Pressable
    {...rest}
    disabled={!!disabled || !!isLoading}
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
    {isLoading ? (
      <ActivityIndicator color={colors.white.primary} size="small" />
    ) : (
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
    )}
  </Pressable>
)
