import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import SearchCocktails from '@/content/SearchCocktails'
import { HomeStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<HomeStackParamList, 'Search Cocktails'>

export default function SearchCocktailsScreen({ route }: Props) {
  return <SearchCocktails />
}
