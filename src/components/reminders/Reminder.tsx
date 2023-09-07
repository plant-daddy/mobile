import { type Reminder as ReminderType } from '@/utils/reminders'
import { Image, View } from 'react-native'
import { Text } from '../global'
import { Fertilize, Water } from '@/assets/svg'
import { colors, fonts } from '@/theme'
import { getRecurrence } from '@/utils/rrule'
import {
  PanGestureHandler,
  type PanGestureHandlerProps,
  type PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { MaterialIcons } from '@expo/vector-icons'
import { ScreenWidth } from '@/theme/dimension'
import { DateTime } from 'luxon'

const TranslateXThreshhold = -ScreenWidth * 0.3

export const Reminder = ({
  frequency,
  interval,
  type,
  id,
  image,
  name,
  nextReminder,
  onRemove,
  simultaneousHandlers
}: ReminderType & {
  onRemove: (id: string) => void
} & Pick<PanGestureHandlerProps, 'simultaneousHandlers'>) => {
  const translateX = useSharedValue(0)
  const opacity = useSharedValue(1)

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      if (event.translationX < 0) translateX.value = event.translationX
    },
    onEnd: () => {
      const shouldDelete = translateX.value < TranslateXThreshhold

      if (shouldDelete) {
        translateX.value = withTiming(-ScreenWidth, undefined, (isFinished) => {
          if (isFinished) runOnJS(onRemove)(id)
        })
        opacity.value = withTiming(0)
      } else translateX.value = withTiming(0)
    }
  })

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))

  return (
    <View style={{ justifyContent: 'center', marginVertical: 6 }}>
      <Animated.View
        style={[
          {
            backgroundColor: colors.red.primary,
            position: 'absolute',
            right: 0,
            padding: 24,
            borderRadius: 16,
            alignSelf: 'center',
            width: '100%',
            alignItems: 'flex-end',
            opacity
          }
        ]}>
        <MaterialIcons name="delete" color={colors.white.light} size={32} />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture} simultaneousHandlers={simultaneousHandlers}>
        <Animated.View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 8,
              borderRadius: 12,
              backgroundColor: colors.labels[type].backgroundColor
            },
            rStyle
          ]}>
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <Image
                source={{ uri: image }}
                style={{ borderRadius: 8, width: 54, height: 72 }}
                resizeMode="contain"
              />
              <Text style={{ fontFamily: fonts.rubik400, fontSize: 16 }}>{name}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {type == 'water' ? <Water /> : <Fertilize />}
            <Text>{getRecurrence({ frequency, interval })}</Text>
            <Text style={{ fontFamily: fonts.rubik400, fontSize: 16 }}>
              {nextReminder.toRelative()}
            </Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}
