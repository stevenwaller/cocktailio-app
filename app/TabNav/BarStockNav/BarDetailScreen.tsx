import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import CocktailList from '@/content/CocktailList'
import { BarStockStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<BarStockStackParamList, 'Bar'>

export default function BarDetailScreen({ route }: Props) {
  return <CocktailList barId={route.params?.barId} name={route.params?.name} />
}
