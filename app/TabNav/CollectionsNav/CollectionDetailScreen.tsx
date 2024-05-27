import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import CocktailList from '@/content/CocktailList'
import { CollectionsStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<CollectionsStackParamList, 'Collection'>

export default function CollectionDetailScreen({ route }: Props) {
  return <CocktailList collectionId={route.params?.collectionId} name={route.params?.name} />
}
