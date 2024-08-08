import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Pressable, View, ViewProps } from 'react-native'

import { BodyText, BodyLinkText, SubTitleText } from '@/components/_elements/Text'
import { useGlasses } from '@/lib/contexts/GlassesContext'
import { HomeStackParamList } from '@/lib/types'

export default function GlassList(restProps: ViewProps) {
  const { isFetching, glasses } = useGlasses()
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()

  if (isFetching) return <BodyText>Loading...</BodyText>

  return (
    <View {...restProps}>
      <SubTitleText>Glassware</SubTitleText>
      {glasses.map((glass) => (
        <Pressable
          key={glass.id}
          onPress={() =>
            navigation.navigate('Cocktails', {
              glass: { id: glass.id, name: glass.name },
            })
          }
        >
          <BodyLinkText>{glass.name}</BodyLinkText>
        </Pressable>
      ))}
    </View>
  )
}
