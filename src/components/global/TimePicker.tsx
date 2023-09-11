import { useModal } from '@/hooks'
import { colors, fonts } from '@/theme'
import React, { useMemo, useState } from 'react'
import { View, type ViewProps, Pressable } from 'react-native'
import { Text } from './Text'
import { DateTime } from 'luxon'
import DateTimePicker, { type AndroidNativeProps } from '@react-native-community/datetimepicker'

export const TimePicker = ({
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
              {selectedValue ? DateTime.fromJSDate(value).toFormat('T') : placeholder}
            </Text>
          </Pressable>
        </View>
        {isOpen && (
          <DateTimePicker
            value={value}
            mode="time"
            display="spinner"
            is24Hour
            minuteInterval={1}
            onChange={(event: any, date: any) => {
              if (event.type === 'set') onChange(event, date)
              else onClose()
            }}
            themeVariant="light"
          />
        )}
      </>
    ),
    [onChange, onClose, value, selectedValue, label]
  )
}
