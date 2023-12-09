import { type PropsWithChildren } from 'react'
import { KeyboardAvoidingView } from 'react-native'

export const WithTabKeyboardAvoidingView = ({ children }: PropsWithChildren) => {
  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={72}>
      {children}
    </KeyboardAvoidingView>
  )
}
