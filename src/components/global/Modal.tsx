import { colors } from '@/theme'
import { HorizontalInset } from '@/theme/dimension'
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'

import { SafeAreaView, View } from 'react-native'

import RNModal, { type ModalProps } from 'react-native-modal'

interface ModalRef {
  open: () => void
  close: () => void
}

export const Modal = forwardRef<ModalRef, Partial<ModalProps>>(function modal(props, ref) {
  const { isVisible, children, ...rest } = props

  const [visible, setVisible] = useState(isVisible)

  useEffect(() => {
    if ('isVisible' in props) setVisible(props.isVisible)
  }, [props, visible])

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true)
    },
    close() {
      setVisible(false)
    }
  }))

  return (
    <RNModal
      {...rest}
      isVisible={visible}
      backdropColor={colors.gray.backdrop}
      style={{ margin: 0, justifyContent: 'flex-end' }}>
      <View
        style={{
          paddingVertical: 24,
          height: '60%',
          backgroundColor: colors.white.light,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16
        }}>
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </View>
    </RNModal>
  )
})
