import { useRef, useState } from 'react'
import { ScrollView, RefreshControl, ActivityIndicator } from 'react-native'

import NewCollectionModal from './NewCollectionModal'
import MoreCollectionModal from '../MoreCollectionModal'

import CollectionCard from '@/components/CollectionCard'
import ErrorAlert from '@/components/ErrorAlert'
import PageContainer from '@/components/PageContainer'
import PlusIcon from '@/components/_icons/Plus'
import Button from '@/components/_inputs/Button'
import { IModal } from '@/components/_overlays/Modal'
import { IStackNavModal } from '@/components/_overlays/StackNavModal'
import { COLORS } from '@/lib/constants'
import { useCollections } from '@/lib/contexts/CollectionsContext'
import useIsMounted from '@/lib/hooks/useIsMounted'
import { TCollection } from '@/lib/types/supabase'

const CollectionList = () => {
  const { isFetching, refetch, error, collections } = useCollections()
  const newModalRef = useRef<IModal>(null)
  const moreModalRef = useRef<IStackNavModal>(null)
  const [currentCollection, setCurrentCollection] = useState<TCollection | null>(null)
  const checkIfMounted = useIsMounted()

  if (isFetching && !checkIfMounted()) {
    return (
      <PageContainer>
        <ActivityIndicator size="small" />
      </PageContainer>
    )
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isFetching && checkIfMounted()}
          onRefresh={refetch}
          tintColor={COLORS.text.body}
        />
      }
    >
      <PageContainer>
        <ErrorAlert message={error?.message} />
        {collections.map((collection: any) => (
          <CollectionCard
            style={{ marginBottom: 20 }}
            key={collection.id}
            collection={collection}
            onMorePress={() => {
              setCurrentCollection(collection)
              moreModalRef.current?.present()
            }}
          />
        ))}
        <Button
          slotLeft={<PlusIcon color={COLORS.text.dark} />}
          label="Create New Collection"
          onPress={() => newModalRef.current?.present()}
        />
        <NewCollectionModal ref={newModalRef} onComplete={() => newModalRef.current?.dismiss()} />
        <MoreCollectionModal
          ref={moreModalRef}
          collection={currentCollection}
          onComplete={() => moreModalRef.current?.dismiss()}
        />
      </PageContainer>
    </ScrollView>
  )
}

CollectionList.displayName = 'CollectionList'

export default CollectionList
