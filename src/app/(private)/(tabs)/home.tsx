/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button, Text } from '@/components/global'
import { ListView, PlantsList } from '@/components/plants'
import { useApi } from '@/contexts/api'
import { usePlants, useUserPlants } from '@/hooks'
import { colors } from '@/theme'
import { ScreenHeight, ScreenWidth } from '@/theme/dimension'
import { Link } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
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
    hasNextPage: hasNextPlantsPage,
    isLoading: isPlantsLoading
  } = usePlants(api)
  const {
    data: userPlants,
    fetchNextPage: fetchUserPlantsNextPage,
    hasNextPage: hasNextUserPlantsPage,
    isLoading: isUserPlantsLoading
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

  const userPlantsArray = userPlants?.pages.flatMap((page) => page.plants) ?? []

  return (
    <View style={{ height: ScreenHeight * 0.6 }}>
      <ListView
        textColor={colors.green.dark}
        title="MY PLANTS"
        style={{ paddingTop: 48, backgroundColor: colors.white.primary }}
        isUserPlant
        plants={userPlantsArray}>
        {isUserPlantsLoading ? (
          <ActivityIndicator color={colors.green.dark} />
        ) : (
          <>
            {userPlantsArray.length === 0 ? (
              <View style={{ alignSelf: 'center', gap: 8 }}>
                <Text>You have no plants yet</Text>
                <Link href="/new-plant" asChild>
                  <Button primary>Add plant</Button>
                </Link>
              </View>
            ) : (
              <Text style={{ color: colors.green.dark, marginBottom: 4 }}>
                You have {userPlantsArray.length} plants!
              </Text>
            )}
            <PlantsList
              textColor={colors.green.dark}
              isUserPlant
              fetchNextPage={loadNextUserPlantsPageData}
              plants={userPlants?.pages.flatMap((page) => page.plants) ?? []}
            />
          </>
        )}
      </ListView>

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
            textColor={colors.white.primary}
            title="ALL PLANTS"
            style={{ marginBottom: 200, backgroundColor: colors.green.dark }}
            plants={plants?.pages.flatMap((page) => page.plants) ?? []}>
            {isPlantsLoading ? (
              <ActivityIndicator color={colors.white.primary} />
            ) : (
              <PlantsList
                textColor={colors.white.primary}
                fetchNextPage={loadNextPlantsPageData}
                plants={plants?.pages.flatMap((page) => page.plants) ?? []}
                disabled={!isBottomSheetUp}
              />
            )}
          </ListView>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}
