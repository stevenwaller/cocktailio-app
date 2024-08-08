import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Pressable, View } from 'react-native'

import { BodyText, BodyLinkText, SubTitleText } from '@/components/_elements/Text'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { HomeStackParamList } from '@/lib/types'

export default function BaseSpirits() {
  const { isFetching, baseSpirits } = useIngredients()
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()

  if (isFetching) return <BodyText>Loading...</BodyText>

  return (
    <View>
      <SubTitleText>Base Spirit</SubTitleText>
      {baseSpirits.map((baseSpirit) => (
        <Pressable
          key={baseSpirit.id}
          onPress={() => navigation.navigate('Cocktails', { baseSpiritId: baseSpirit.id })}
        >
          <BodyLinkText>{baseSpirit.name}</BodyLinkText>
        </Pressable>
      ))}
    </View>
  )
}
