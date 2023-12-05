import {
  type ImagePickerResult,
  launchCameraAsync,
  launchImageLibraryAsync
} from 'expo-image-picker'

export const useImagePicker = () => ({
  pickImage: async (camera?: boolean) => {
    try {
      let result: ImagePickerResult

      if (camera) result = await launchCameraAsync({ allowsEditing: true, quality: 1 })
      else
        result = await launchImageLibraryAsync({
          quality: 1,
          allowsEditing: true
        })

      if (result.canceled) return null

      const img = result.assets[0]

      const localUri = img.uri
      const filename = localUri.split('/').pop() ?? ''

      const match = /\.(\w+)$/.exec(filename)
      const type = match ? `image/${match[1]}` : 'image'

      return {
        uri: localUri,
        name: filename,
        type
      }
    } catch (err) {
      console.error(err)
      return null
    }
  }
})
