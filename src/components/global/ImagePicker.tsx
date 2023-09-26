import { colors, fonts } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { Image, Pressable, View } from 'react-native'
import { Modal } from './Modal'
import { useModal } from '@/hooks'
import { Title } from './Title'
import { Text } from './Text'

export const ImagePicker = ({ defaultValue }: { defaultValue: string }) => {
  const { isOpen, onClose, onOpen } = useModal()

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
              borderWidth: 1,
              borderColor: colors.green.light,
              borderRadius: 24,
              padding: 2
            }}>
            <MaterialIcons name="delete-outline" size={24} color={colors.green.light} />
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 24 }}>
          <Pressable style={{ alignItems: 'center', gap: 8 }}>
            <MaterialIcons
              name="camera-alt"
              size={48}
              color={colors.green.light}
              style={{
                borderWidth: 1,
                borderColor: colors.green.light,
                borderRadius: 48,
                padding: 8
              }}
            />
            <Text color={colors.green.light} style={{ fontFamily: fonts.rubik400 }}>
              Camera
            </Text>
          </Pressable>
          <Pressable style={{ alignItems: 'center', gap: 8 }}>
            <MaterialIcons
              name="photo"
              size={48}
              color={colors.green.light}
              style={{
                borderWidth: 1,
                borderColor: colors.green.light,
                borderRadius: 48,
                padding: 8
              }}
            />
            <Text color={colors.green.light} style={{ fontFamily: fonts.rubik400 }}>
              Gallery
            </Text>
          </Pressable>
        </View>
      </Modal>
    </>
  )
}
