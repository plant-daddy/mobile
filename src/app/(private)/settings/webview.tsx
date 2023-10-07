import { colors } from '@/theme'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'

import { GoBack, Text } from 'components/global'

export default function Webview() {
  const { url, headers, title } = useLocalSearchParams<{
    url: string
    headers: string
    title: string
  }>()
  const [loading, setLoading] = useState(true)

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexGrow: 1
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: HorizontalInset,
          paddingVertical: VerticalInset / 2,
          alignItems: 'center'
        }}>
        <GoBack />
        <Text>{title ?? url} </Text>
      </View>
      {loading && <ActivityIndicator color={colors.green.light} />}
      <WebView
        onLoad={() => {
          setLoading(false)
        }}
        javaScriptEnabled
        source={{ uri: url, headers: headers ?? {} }}
        originWhitelist={['*']}
        style={{
          flex: 1,
          opacity: loading ? 0 : 1,
          padding: '10%',
          flexGrow: 1
        }}
      />
    </SafeAreaView>
  )
}
