import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useRef } from 'react'

import BarHeaderBtns from '../_sharedHeaderBtns/BarHeaderBtns'

import CocktailList from '@/content/CocktailList'
import MoreBarModal, { IMoreBarModal } from '@/content/MoreBarModal'
import useBars from '@/lib/hooks/useBars'
import { BarStockStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<BarStockStackParamList, 'Bar'>

export default function BarDetailScreen({ route, navigation }: Props) {
  const barId = route.params?.barId
  const { bar } = useBars(barId)
  const moreModalRef = useRef<IMoreBarModal>(null)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <BarHeaderBtns
          onSearchPress={() => navigation.navigate('Search Cocktails')}
          onMorePress={() => moreModalRef.current?.present()}
        />
      ),
    })
  }, [navigation])

  return (
    <>
      <CocktailList barId={bar?.id} name={bar?.name} />
      <MoreBarModal
        ref={moreModalRef}
        bar={bar}
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
