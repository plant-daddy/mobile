import { useApi } from '@/contexts/api'
import { useImagePicker, useModal } from '@/hooks'
import { type APIResponse } from '@/service/api'
import { colors, fonts } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Alert, Image, Pressable, View } from 'react-native'

import { Modal } from './Modal'
import { Text } from './Text'
import { Title } from './Title'

const Item = ({
  text,
  icon,
  onPress
}: {
  text: string
  icon: React.ComponentProps<typeof MaterialIcons>['name']
  onPress: () => void
}) => (
  <Pressable style={{ alignItems: 'center', gap: 8 }} onPress={onPress}>
    <View
      style={{
        borderWidth: 2,
        borderColor: `${colors.green.light}50`,
        borderRadius: 48,
        padding: 8
      }}>
      <MaterialIcons name={icon} size={48} color={colors.green.light} />
    </View>
    <Text color={colors.green.light} style={{ fontFamily: fonts.rubik400 }}>
      {text}
    </Text>
  </Pressable>
)

export const ImagePicker = ({
  defaultValue,
  onChange,
  value
}: {
  defaultValue: string
  onChange: (e: string) => void
  value?: string
}) => {
  const { isOpen, onClose, onOpen } = useModal()
  const { api } = useApi()

  const { pickImage } = useImagePicker()

  const handleUpload = async () => {
    const res = await pickImage()

    if (!res) {
      Alert.alert('An error has occurred while selecting an image')
      onClose()
      return
    }

    const formData = new FormData()

    // @ts-expect-error
    formData.append('file', res)

    try {
      const { data } = await api.post<APIResponse<{ imageUrl: string }>>('/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      onChange(data.result.data.imageUrl)
    } catch {
      Alert.alert('An error has occurred while selecting an image')
    }

    onClose()
  }

  return (
    <>
      <Pressable style={{ alignSelf: 'center' }} onPress={onOpen}>
        <Image
          source={{ uri: value ?? defaultValue }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
        />
        <View
          style={{
            position: 'absolute',
            right: 1,
            bottom: 1,
            backgroundColor: colors.green.light,
            padding: 8,
            borderRadius: 32,
            borderWidth: 4,
            borderColor: colors.white.primary
          }}>
          <MaterialIcons name="camera-alt" size={16} color={colors.white.light} />
        </View>
      </Pressable>
      <Modal isVisible={isOpen} onBackdropPress={onClose} style={{ height: '30%', padding: 48 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Title>PROFILE PHOTO</Title>
          <Pressable
            style={{
              borderWidth: 2,
              borderColor: `${colors.green.light}50`,
              borderRadius: 24,
              padding: 2
            }}>
            <MaterialIcons name="delete-outline" size={24} color={colors.green.light} />
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 24 }}>
          <Item icon="camera-alt" text="Camera" onPress={handleUpload} />
          <Item icon="photo" text="Gallery" onPress={handleUpload} />
        </View>
      </Modal>
    </>
  )
}
