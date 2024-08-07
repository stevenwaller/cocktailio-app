import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Pressable, View, ViewProps } from 'react-native'

import { BodyText, BodyLinkText, SubTitleText } from '@/components/_elements/Text'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { HomeStackParamList } from '@/lib/types'

export default function BaseSpiritList(restProps: ViewProps) {
  const { isFetching, baseSpirits } = useIngredients()
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()

  if (isFetching) return <BodyText>Loading...</BodyText>

  return (
    <View {...restProps}>
      <SubTitleText>Base Spirit</SubTitleText>
      {baseSpirits.map((baseSpirit) => (
        <Pressable
          key={baseSpirit.id}
          onPress={() =>
            navigation.navigate('Cocktails', {
              baseSpirit: { id: baseSpirit.id, name: baseSpirit.name },
            })
          }
        >
          <BodyLinkText>{baseSpirit.name}</BodyLinkText>
        </Pressable>
      ))}
    </View>
  )
}
