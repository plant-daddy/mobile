import { colors, fonts } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { Image, Pressable, View } from 'react-native'
import { Modal } from './Modal'
import { useImagePicker, useModal } from '@/hooks'
import { Title } from './Title'
import { Text } from './Text'
import React from 'react'

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
  onChange
}: {
  defaultValue: string
  onChange: (e: string) => void
}) => {
  const { isOpen, onClose, onOpen } = useModal()

  const { pickImage } = useImagePicker()

  return (
    <>
      <Pressable style={{ alignSelf: 'center' }} onPress={onOpen}>
        <Image
          source={{ uri: defaultValue }}
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
          <Item
            icon="camera-alt"
            text="Camera"
            onPress={async () => {
              const res = await pickImage(true)
              onChange(res?.file ?? '')
              onClose()
            }}
          />
          <Item
            icon="photo"
            text="Gallery"
            onPress={async () => {
              const res = await pickImage()
              onChange(res?.file ?? '')
              onClose()
            }}
          />
        </View>
      </Modal>
    </>
  )
}
