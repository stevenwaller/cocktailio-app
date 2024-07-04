import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRef } from 'react'

import CocktailList from '@/content/CocktailList'
import MoreBarModal, { IMoreBarModal } from '@/content/MoreBarModal'
import { useBars } from '@/lib/contexts/BarsContext'
import { BarStockStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<BarStockStackParamList, 'Bar'>

export default function BarDetailScreen({ route, navigation }: Props) {
  const barId = route.params?.barId
  const { bar } = useBars(barId)
  const moreModalRef = useRef<IMoreBarModal>(null)

  return (
    <>
      <CocktailList
        barId={bar?.id}
        name={bar?.name}
        onSearchPress={() =>
          navigation.navigate('Search Bar Cocktails', {
            barId,
          })
        }
        onMorePress={() => moreModalRef.current?.present()}
      />
      <MoreBarModal
        ref={moreModalRef}
        barId={bar?.id}
        onComplete={() => {
          moreModalRef.current?.dismiss()
        }}
        onDelete={() => {
          navigation.goBack()
        }}
      />
    </>
  )
}
