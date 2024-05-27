import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useRef } from 'react'

import CollectionHeaderBtns from '../_sharedHeaderBtns/CollectionHeaderBtns'

import CocktailList from '@/content/CocktailList'
import MoreCollectionModal, { IMoreCollectionModal } from '@/content/MoreCollectionModal'
import useCollections from '@/lib/hooks/useCollections'
import { CollectionsStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<CollectionsStackParamList, 'Collection'>

export default function CollectionDetailScreen({ route, navigation }: Props) {
  const collectionId = route.params?.collectionId
  const { collection } = useCollections(collectionId)
  const moreModalRef = useRef<IMoreCollectionModal>(null)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CollectionHeaderBtns
          onSearchPress={() => navigation.navigate('Search Cocktails')}
          onMorePress={() => moreModalRef.current?.present()}
        />
      ),
    })
  }, [navigation])

  return (
    <>
      <CocktailList collectionId={collection?.id} name={collection?.name} />
      <MoreCollectionModal
        ref={moreModalRef}
        collection={collection}
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
