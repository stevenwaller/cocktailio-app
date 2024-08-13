import { useNavigation, NavigationProp } from '@react-navigation/native'
import { View, Pressable } from 'react-native'

import { SubTitleText, BodyLinkText } from '@/components/_elements/Text'
import Skeleton from '@/components/_loaders/Skeleton'
import { HomeStackParamList } from '@/lib/types'
import { TSource } from '@/lib/types/supabase'

interface IProps {
  isLoading: boolean
  source: TSource | null
}

export default function FeaturedSource({ isLoading, source }: IProps) {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>()

  const renderContent = () => {
    if (isLoading || !source) {
      return <Skeleton height={95} />
    }

    return (
      <Pressable
        onPress={() => navigation.navigate('Source', { sourceId: source.id, name: source.name })}
      >
        <BodyLinkText>{source.name}</BodyLinkText>
      </Pressable>
    )
  }

  return (
    <View style={{ marginBottom: 30 }}>
      <SubTitleText style={{ marginBottom: 12 }}>Featured Source</SubTitleText>
      {renderContent()}
    </View>
  )
}
