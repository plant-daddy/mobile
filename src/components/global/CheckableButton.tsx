import React from 'react'
import {
  Pressable,
  type StyleProp,
  Text,
  type TextStyle,
  type TouchableHighlightProps
} from 'react-native'
import { type SvgProps } from 'react-native-svg'

type ButtonProps = TouchableHighlightProps & {
  children: React.ReactNode
  textStyle?: StyleProp<TextStyle>
  primary?: boolean
  icon?: React.FC<SvgProps>
  checked: boolean
  onToggle: (prop: boolean) => void
}

export const CheckableButton = ({
  children,
  primary,
  textStyle,
  checked,
  icon: Icon,
  onToggle,
  ...rest
}: ButtonProps) => (
  <Pressable
    {...rest}
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      opacity: checked ? 1 : 0.3,
      flexDirection: 'row',
      padding: 8,
      borderRadius: 16,
      elevation: 5,
      flex: 1,
      ...(rest.style as Object)
    }}
    onPress={() => {
      onToggle(!checked)
    }}>
    {Icon && <Icon style={{ marginRight: 4 }} />}
    <Text style={textStyle}>{children}</Text>
  </Pressable>
)
