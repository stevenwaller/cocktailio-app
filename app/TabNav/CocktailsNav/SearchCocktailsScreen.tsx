import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import SearchCocktails from '@/content/SearchCocktails'
import { CocktailsStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<CocktailsStackParamList, 'Search Cocktails'>

export default function SearchCocktailsScreen({ route }: Props) {
  return <SearchCocktails />
}
