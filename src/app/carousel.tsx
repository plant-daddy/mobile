import { Button, Text, Title } from '@/components/global'
import { colors } from '@/theme'
import { ScreenHeight, WindowWidth } from '@/theme/dimension'
import { Link, router } from 'expo-router'
import { useRef, useState } from 'react'
import { Image, Pressable, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const items = [
  {
    title: 'Learn anytime and anywhere',
    description:
      "Just got a new plant and don't know what to do? Plant Daddy has your back! Learn how to take care of any plant, from anywhere!",
    image: (
      <Image
        style={{
          padding: 0,
          width: WindowWidth,
          height: 500,
          alignSelf: 'flex-start'
        }}
        resizeMode="contain"
        source={require('../assets/images/intro-1.png')}
      />
    )
  },
  {
    title: 'Never forget to water them again!',
    description: 'Plant Daddy reminds you when water is needed, how much and much more!',
    image: (
      <Image
        style={{
          padding: 0,
          width: WindowWidth,
          height: 500,
          alignSelf: 'flex-start'
        }}
        resizeMode="contain"
        source={require('../assets/images/intro-2.png')}
      />
    )
  },
  {
    title: 'Find the perfect plant for your enviroment',
    description:
      'Find what goes well with your apartment or house, what plant can handle your city weather, climate and plenty of other factors',
    image: (
      <Image
        style={{
          padding: 0,
          width: WindowWidth,
          height: 500,
          alignSelf: 'flex-start'
        }}
        resizeMode="cover"
        source={require('../assets/images/intro-3.png')}
      />
    )
  }
]

const SlideBox = ({ slide }: { slide: (typeof items)[number] }) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: WindowWidth,
      maxHeight: ScreenHeight * 0.7
    }}>
    {slide.image}
    <View style={{ paddingHorizontal: 48, marginTop: 16 }}>
      <Title>{slide.title}</Title>
      <Text>{slide.description}</Text>
    </View>
  </View>
)

export default function Carousel() {
  const [active, setActive] = useState<number>(0)
  const scrollViewRef = useRef<ScrollView>(null)

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          onScroll={(data) => {
            const newActive = Math.round(data.nativeEvent.contentOffset.x / WindowWidth)
            setActive(newActive)
          }}>
          {items.map((s, i) => (
            <View key={i}>
              <SlideBox slide={s} />
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row'
          }}>
          {items.map((_, i) => (
            <View
              key={i}
              style={{
                height: 8,
                width: active === i ? 16 : 8,
                backgroundColor: active === i ? colors.green.light : colors.gray.primary,
                marginHorizontal: 4,
                marginVertical: 16,
                borderRadius: 4
              }}
            />
          ))}
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 48,
          justifyContent: 'space-between',
          flexGrow: 1
        }}>
        <Button
          primary
          style={{ borderRadius: 4, padding: 16 }}
          onPress={() => {
            if (active === 2) router.replace('/auth/signin')
            else {
              scrollViewRef.current?.scrollTo({
                x: WindowWidth * (active + 1),
                animated: true
              })
            }
          }}>
          {active === 2 ? "Let's start" : 'Next'}
        </Button>

        <Link href="/auth/signin" asChild>
          <Pressable style={{ alignSelf: 'flex-end', marginBottom: 24 }}>
            <Text>Skip</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  )
}
