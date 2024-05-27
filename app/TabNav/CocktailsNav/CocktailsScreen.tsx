import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import CocktailList from '@/content/CocktailList'
import { CocktailsStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<CocktailsStackParamList, 'Cocktails'>

export default function CocktailsScreen(props: Props) {
  return <CocktailList />
}
