import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Pressable, View, ViewProps } from 'react-native'

import { BodyText, BodyLinkText, SubTitleText } from '@/components/_elements/Text'
import { useEras } from '@/lib/contexts/ErasContext'
import { HomeStackParamList } from '@/lib/types'

export default function EraList(restProps: ViewProps) {
  const { isFetching, eras } = useEras()
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()

  if (isFetching) return <BodyText>Loading...</BodyText>

  return (
    <View {...restProps}>
      <SubTitleText>Eras</SubTitleText>
      {eras.map((era) => (
        <Pressable
          key={era.id}
          onPress={() =>
            navigation.navigate('Cocktails', {
              era: { id: era.id, name: era.name },
            })
          }
        >
          <BodyLinkText>{era.name}</BodyLinkText>
        </Pressable>
      ))}
    </View>
  )
}
