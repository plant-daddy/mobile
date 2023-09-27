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

      return {
        file: img.uri,
        fileName: img.fileName,
        fileType: img.type
      }
    } catch (err) {
      console.error(err)
      return null
    }
  }
})
