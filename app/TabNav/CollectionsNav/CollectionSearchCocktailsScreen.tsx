import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import SearchCocktails from '@/content/SearchCocktails'
import { CollectionsStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<CollectionsStackParamList, 'Search Collection Cocktails'>

export default function CollectionSearchCocktailsScreen({ route }: Props) {
  const collectionId = route.params?.collectionId

  return <SearchCocktails collectionId={collectionId} />
}
