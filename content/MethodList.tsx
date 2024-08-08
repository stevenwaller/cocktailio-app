import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Pressable, View, ViewProps } from 'react-native'

import { BodyText, BodyLinkText, SubTitleText } from '@/components/_elements/Text'
import { useMethods } from '@/lib/contexts/MethodsContext'
import { HomeStackParamList } from '@/lib/types'

export default function MethodList(restProps: ViewProps) {
  const { isFetching, methods } = useMethods()
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()

  if (isFetching) return <BodyText>Loading...</BodyText>

  return (
    <View {...restProps}>
      <SubTitleText>Methods</SubTitleText>
      {methods.map((method) => (
        <Pressable
          key={method.id}
          onPress={() =>
            navigation.navigate('Cocktails', { method: { id: method.id, name: method.name } })
          }
        >
          <BodyLinkText>{method.name}</BodyLinkText>
        </Pressable>
      ))}
    </View>
  )
}
