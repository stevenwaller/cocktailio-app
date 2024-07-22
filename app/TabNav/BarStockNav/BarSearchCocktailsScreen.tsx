import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import SearchCocktails from '@/content/SearchCocktails'
import { BarStockStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<BarStockStackParamList, 'Search Bar Cocktails'>

export default function BarSearchCocktailsScreen({ route }: Props) {
  const barId = route.params?.barId

  return <SearchCocktails barId={barId} />
}
