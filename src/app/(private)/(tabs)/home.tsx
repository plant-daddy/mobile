/* eslint-disable @typescript-eslint/no-floating-promises */
import { ListView } from '@/components/plants'
import { useApi } from '@/contexts/api'
import { usePlants, useUserPlants } from '@/hooks'
import { colors } from '@/theme'
import { ScreenHeight, ScreenWidth } from '@/theme/dimension'
import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

const MaxTranslateY = -ScreenHeight + 50

export default function Home() {
  const { api } = useApi()

  const {
    data: plants,
    fetchNextPage: fetchPlantsNextPage,
    hasNextPage: hasNextPlantsPage
  } = usePlants(api)
  const {
    data: userPlants,
    fetchNextPage: fetchUserPlantsNextPage,
    hasNextPage: hasNextUserPlantsPage
  } = useUserPlants(api)

  const loadNextPlantsPageData = () => {
    if (hasNextPlantsPage) fetchPlantsNextPage()
  }

  const loadNextUserPlantsPageData = () => {
    if (hasNextUserPlantsPage) fetchUserPlantsNextPage()
  }

  const [isBottomSheetUp, setIsBottomSheetUp] = useState(false)

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
      if (translateY.value > -ScreenHeight / 3) {
        scrollTo(-ScreenHeight / 2.5)
        runOnJS(setIsBottomSheetUp)(false)
      } else {
        scrollTo(MaxTranslateY)
        runOnJS(setIsBottomSheetUp)(true)
      }
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
        fetchNextPage={loadNextUserPlantsPageData}
        plants={userPlants?.pages.flatMap((page) => page.plants) ?? []}
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
            fetchNextPage={loadNextPlantsPageData}
            plants={plants?.pages.flatMap((page) => page.plants) ?? []}
            disabled={!isBottomSheetUp}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}
