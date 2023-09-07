/* eslint-disable multiline-ternary */
import { Image, ScrollView, View } from 'react-native'
import { GoBack, Text, Title } from '../global'
import { type Plant as PlantType, getPlantFirstName, getPlanInfo } from '@/utils/plant'
import { HorizontalInset, VerticalInset } from '@/theme/dimension'
import { fonts } from '@/theme'

export const Plant = ({
  image,
  commonName,
  name,
  botanicalName,
  ...rest
}: PlantType & { name?: string }) => {
  const { table, texts } = getPlanInfo(rest)

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'flex-start',
        marginHorizontal: HorizontalInset,
        paddingVertical: VerticalInset
      }}>
      <GoBack />
      <Title style={{ marginTop: 16 }}>{name ?? getPlantFirstName(commonName)}</Title>
      <Image
        source={{ uri: image }}
        style={{ width: 260, height: 260, alignSelf: 'center', marginVertical: 16 }}
      />
      <Title style={{ fontSize: 20, textAlign: 'left' }}>
        {botanicalName}, {name ? commonName : commonName.split(',').slice(1)}
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
    </ScrollView>
  )
}
