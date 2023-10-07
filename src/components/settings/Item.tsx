import { colors } from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'

import { Text } from '../global'

export const SettingsItem = ({
  icon,
  onPress,
  text,
  external,
  dividerTop
}: {
  text: string
  icon: React.ComponentProps<typeof MaterialIcons>['name']
  external?: boolean
  onPress: () => void
  dividerTop?: boolean
}) => (
  <>
    {dividerTop && (
      <View style={{ width: '100%', height: 1, backgroundColor: colors.green.light }}></View>
    )}
    <Pressable
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 16,
        alignItems: 'center'
      }}
      onPress={onPress}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <MaterialIcons name={icon} size={22} color={colors.green.light} />
        <Text style={{ fontSize: 16 }}>{text}</Text>
      </View>
      <MaterialIcons
        name={external ? 'north-east' : 'arrow-forward'}
        size={16}
        color={colors.green.light}
      />
    </Pressable>
  </>
)
