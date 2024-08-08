import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRef } from 'react'

import CocktailList from '@/content/CocktailList'
import MoreCollectionModal, { IMoreCollectionModal } from '@/content/MoreCollectionModal'
import { useCollections } from '@/lib/contexts/CollectionsContext'
import { CollectionsStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<CollectionsStackParamList, 'Collection'>

export default function CollectionDetailScreen({ route, navigation }: Props) {
  const collectionParam = route.params?.collection
  const { collection } = useCollections(collectionParam?.id)
  const moreModalRef = useRef<IMoreCollectionModal>(null)

  return (
    <>
      <CocktailList
        collectionId={collection?.id}
        name={collection?.name}
        onSearchPress={() =>
          navigation.navigate('Search Collection Cocktails', {
            collectionId: collection ? collection.id : undefined,
          })
        }
        onMorePress={() => moreModalRef.current?.present()}
      />
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
