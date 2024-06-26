import { useModal } from '@/hooks'
import { colors, fonts } from '@/theme'
import DateTimePicker, { type AndroidNativeProps } from '@react-native-community/datetimepicker'
import { DateTime } from 'luxon'
import React, { useMemo, useState } from 'react'
import { Pressable, View, type ViewProps } from 'react-native'

import { Text } from './Text'

export const DatePicker = ({
  value,
  placeholder,
  onChange: onChangeProp,
  label,
  ...rest
}: {
  onChange: (value: any) => void
  placeholder?: string
  label?: string
} & ViewProps &
  AndroidNativeProps) => {
  const { isOpen, onOpen, onClose } = useModal()

  const [selectedValue, setSelectedValue] = useState(value)

  const onChange = (_: any, val: Date) => {
    setSelectedValue(val)
    onChangeProp(val)
    onClose()
  }

  return useMemo(
    () => (
      <>
        <View style={{ flex: 1 }}>
          {label && (
            <Text
              style={{
                fontFamily: fonts.rubik400,
                fontSize: 18,
                color: colors.green.dark,
                marginBottom: 8
              }}>
              {label}
            </Text>
          )}
          <Pressable
            style={{
              borderColor: colors.green.light,
              borderWidth: 1,
              borderRadius: 4,
              padding: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onPress={() => {
              onOpen()
            }}>
            <Text style={{ color: selectedValue ? colors.green.dark : colors.gray.mid }}>
              {selectedValue ? DateTime.fromJSDate(value).toLocaleString() : placeholder}
            </Text>
          </Pressable>
        </View>
        {isOpen && (
          <DateTimePicker
            minimumDate={DateTime.now().toJSDate()}
            value={value}
            mode="date"
            display="spinner"
            onChange={(event: any, date: any) => {
              if (event.type === 'set') onChange(event, date)
              else onClose()
            }}
            textColor={colors.white.primary}
            themeVariant="light"
          />
        )}
      </>
    ),
    [onChange, onClose, value, selectedValue, label]
  )
}
