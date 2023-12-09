/* eslint-disable multiline-ternary */
import { colors, fonts } from '@/theme'
import { ScreenWidth } from '@/theme/dimension'
import { type Plant as PlantType, getPlanInfo, getPlantFirstName } from '@/utils/plant'
import { MaterialIcons } from '@expo/vector-icons'
import { Image, Pressable, View } from 'react-native'

import { GoBack, Text, Title } from '../global'

export const Plant = ({
  image,
  commonName,
  nickname,
  botanicalName,
  icon,
  onPress,
  ...rest
}: PlantType & {
  icon: React.ComponentProps<typeof MaterialIcons>['name']
  onPress: () => void
}) => {
  const { table, texts } = getPlanInfo(rest)

  return (
    <View
      style={{
        alignItems: 'flex-start'
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16
          }}>
          <GoBack />
          <Title>{nickname ?? getPlantFirstName(commonName)}</Title>
        </View>

        <Pressable
          onPress={onPress}
          style={{
            padding: 6
          }}>
          <MaterialIcons name={icon} size={24} color={colors.green.dark} />
        </Pressable>
      </View>
      <Image
        source={{ uri: image }}
        style={{ width: ScreenWidth, height: 260, alignSelf: 'center', marginVertical: 16 }}
      />

      <Title style={{ fontSize: 20, textAlign: 'left' }}>
        {botanicalName}, {nickname ? commonName : commonName.split(',').slice(1)}
      </Title>

      {Object.keys(texts).map((key) => (
        <View key={key} style={{ marginVertical: 8, gap: 4 }}>
          <Text style={{ fontFamily: fonts.rubik400, fontSize: 18 }}>{key}</Text>
          <Text>{texts[key]}</Text>
        </View>
      ))}

      {Object.keys(table).map((key) => (
        <View
          key={key}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginVertical: 8,
            gap: 24
          }}>
          <Text style={{ fontFamily: fonts.rubik400, fontSize: 18 }}>{key}</Text>
          <Text style={{ textAlign: 'right', flexShrink: 1 }}>{table[key]}</Text>
        </View>
      ))}
    </View>
  )
}
