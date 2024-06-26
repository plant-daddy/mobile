/* eslint-disable multiline-ternary */
import { useModal } from '@/hooks'
import { colors, fonts } from '@/theme'
import { HorizontalInset } from '@/theme/dimension'
import { MaterialIcons } from '@expo/vector-icons'
import { findIndex, isEqual } from 'lodash'
import React, { type ReactNode, cloneElement, useMemo, useState } from 'react'
import { FlatList, type FlatListProps, Pressable, View, type ViewProps } from 'react-native'

import { Input } from './Input'
import { Modal } from './Modal'
import { Text } from './Text'

const resolveMultiLevelAccess = (obj: any, key: string) =>
  key.split('.').reduce((cur: any, keySection: string) => {
    if (cur === null || cur === undefined) return

    if (cur[keySection] === null || cur[keySection] === undefined) {
      console.warn(`Property "${key}" does not exists in the data`)
      return
    }

    return cur[keySection]
  }, obj)

export const Select = ({
  searchableProps,
  data,
  value,
  noResultsMessage = 'No results found',
  selectedValueLabel,
  placeholder,
  renderItem,
  inputLabel,
  onSelect: onSelectProp,
  label,
  renderAs,
  ...rest
}: {
  value: any
  data: any[]
  selectedValueLabel: string | string[]
  onSelect: (value: any) => void
  noResultsMessage?: string
  placeholder?: string
  searchableProps?: '*' | string[]
  inputLabel?: string
  label?: string
  inputStyle?: ViewProps['style']
  renderAs?: ReactNode
} & ViewProps &
  Pick<FlatListProps<any>, 'renderItem'>) => {
  const { isOpen, onOpen, onClose } = useModal()

  const [selectedValue, setSelectedValue] = useState(value)
  const [searchTerm, setSearchTerm] = useState('')

  const isSearchable = useMemo(() => !!searchableProps?.length, [searchableProps])

  const searchedData = useMemo(() => {
    if (!searchableProps || (Array.isArray(searchableProps) && !searchableProps.length)) return data

    return data.filter((item: any) => {
      const lowSearch = searchTerm
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')

      if (!Array.isArray(searchableProps))
        return String(item)
          .toLocaleLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '')
          .includes(lowSearch)

      return searchableProps.some((key: string) =>
        String(resolveMultiLevelAccess(item, key))
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '')
          .includes(lowSearch)
      )
    })
  }, [searchableProps, searchTerm, data])

  const onSelect = (v: any) => {
    setSelectedValue(v)
    onSelectProp(v)
    onClose()
  }

  return (
    <>
      {renderAs ? (
        <Pressable
          onPress={() => {
            onOpen()
          }}>
          {renderAs}
        </Pressable>
      ) : (
        <View style={rest.inputStyle}>
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
              {selectedValue ? selectedValueLabel : placeholder}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" color={colors.gray.mid} size={16} />
          </Pressable>
        </View>
      )}

      <Modal
        isVisible={isOpen}
        onBackdropPress={onClose}
        animationIn="slideInUp"
        hideModalContentWhileAnimating
        style={[{ height: '80%', paddingHorizontal: HorizontalInset }, rest.style]}>
        {isSearchable && (
          <>
            <Input
              style={{
                borderColor: colors.gray.primary
              }}
              placeholder="Type in your search"
              placeholderTextColor={colors.gray.mid}
              onChangeText={(t) => {
                setSearchTerm(t)
              }}
              value={searchTerm}
            />
            {inputLabel && <Text style={{ fontSize: 12, marginVertical: 8 }}>{inputLabel}</Text>}
          </>
        )}
        <View style={{ flex: 1 }}>
          {!!searchedData && searchedData.length > 0 ? (
            <FlatList
              data={searchedData}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: colors.gray.primary, width: '100%' }} />
              )}
              renderItem={(item) =>
                renderItem ? (
                  // @ts-expect-error
                  cloneElement(renderItem(item), {
                    onSelect,
                    selectedValue
                  })
                ) : (
                  <></>
                )
              }
            />
          ) : (
            <Text style={{ textAlign: 'center', color: colors.gray.mid, flex: 1, marginTop: 64 }}>
              {noResultsMessage}
            </Text>
          )}
        </View>
      </Modal>
    </>
  )
}

export const SelectOption = ({
  onSelect,
  selectedValue,
  value,
  children
}: {
  onSelect?: (value: any) => void
  children: ReactNode
  selectedValue?: any
  value: any
}) => {
  const isSelected = Array.isArray(selectedValue)
    ? findIndex(selectedValue, value) !== -1
    : isEqual(selectedValue, value)

  const onOptionSelect = () => {
    if (onSelect) onSelect(value)
  }

  const renderChildren = () => {
    if (typeof children === 'string')
      return (
        <Text style={{ fontFamily: isSelected ? fonts.rubik400 : fonts.rubik300 }}>{children}</Text>
      )
    return children
  }

  return (
    <Pressable
      onPress={onOptionSelect}
      style={{
        paddingVertical: 16,
        flexDirection: 'row',
        paddingHorizontal: 8,
        gap: 16
      }}>
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>{renderChildren()}</View>
      {isSelected && <MaterialIcons name="check" size={16} />}
    </Pressable>
  )
}
