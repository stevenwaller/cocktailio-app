import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import CocktailList from '@/content/CocktailList'
import { HomeStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<HomeStackParamList, 'Cocktails'>

export default function CocktailsScreen({ navigation }: Props) {
  return <CocktailList showBarStock onSearchPress={() => navigation.navigate('Search Cocktails')} />
}
