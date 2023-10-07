import Constants from 'expo-constants'

const local = () =>
  Constants.manifest2?.extra?.expoClient?.hostUri
    ?.split(':')
    ?.shift()
    ?.replace('127.0.0.1', 'localhost')

export const web = () => `${local()}:3000`
