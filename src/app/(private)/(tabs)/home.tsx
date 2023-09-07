import { ListView } from '@/components/plants'
import { usePlants, useUserPlants } from '@/hooks'
import { colors } from '@/theme'
import { ScreenHeight, ScreenWidth } from '@/theme/dimension'
import { useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

const MaxTranslateY = -ScreenHeight + 50

export default function Home() {
  const { data: plants } = usePlants()
  const { data: userPlants } = useUserPlants()

  const translateY = useSharedValue(0)
  const context = useSharedValue({ y: 0 })

  const scrollTo = useCallback((destination: number) => {
    'worklet'
    translateY.value = withSpring(destination, { damping: 50 })
  }, [])

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y
      translateY.value = Math.max(translateY.value, MaxTranslateY)
    })
    .onEnd(() => {
      if (translateY.value > -ScreenHeight / 3) scrollTo(-ScreenHeight / 2.5)
      else scrollTo(MaxTranslateY)
    })

  const bottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MaxTranslateY + 50, MaxTranslateY],
      [24, 5],
      Extrapolate.CLAMP
    )

    return { borderRadius, transform: [{ translateY: translateY.value }] }
  })

  useEffect(() => {
    scrollTo(-ScreenHeight / 2.5)
  }, [])

  return (
    <View style={{ height: ScreenHeight * 0.6 }}>
      <ListView
        backgroundColor={colors.white.primary}
        textColor={colors.green.dark}
        title="MY PLANTS"
        style={{ paddingTop: 48 }}
        count
        isUserPlant
        plants={userPlants ?? []}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              height: ScreenHeight,
              width: ScreenWidth,
              position: 'absolute',
              top: ScreenHeight,
              borderRadius: 24,
              backgroundColor: colors.green.dark
            },
            bottomSheetStyle
          ]}>
          <View
            style={{
              width: 75,
              height: 4,
              backgroundColor: colors.white.primary,
              alignSelf: 'center',
              marginVertical: 15,
              borderRadius: 2
            }}
          />
          <ListView
            backgroundColor={colors.green.dark}
            textColor={colors.white.primary}
            title="ALL PLANTS"
            style={{ marginBottom: 200 }}
            plants={plants ?? []}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}
