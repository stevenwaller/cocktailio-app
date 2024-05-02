import { useRef, useState } from 'react'

import MoreCollectionModal from './MoreCollectionModal'
import NewCollectionModal from './NewCollectionModal'

import CollectionCard from '@/components/CollectionCard'
import { BodyText } from '@/components/_elements/Text'
import PlusIcon from '@/components/_icons/Plus'
import Button from '@/components/_inputs/Button'
import { IModal } from '@/components/_overlays/Modal'
import { IStackNavModal } from '@/components/_overlays/StackNavModal'
import { COLORS } from '@/lib/constants'
import useCollections from '@/lib/hooks/useCollections'
import { TCollection } from '@/lib/types/supabase'

const CollectionList = () => {
  const { isFetching, error, collections } = useCollections()
  const newModalRef = useRef<IModal>(null)
  const moreModalRef = useRef<IStackNavModal>(null)
  const [currentCollection, setCurrentCollection] = useState<TCollection | null>(null)

  if (error) {
    return <BodyText>Error: {error.message}</BodyText>
  }

  if (isFetching) {
    return <BodyText>Loading...</BodyText>
  }

  if (collections.length === 0) {
    return <BodyText>No collections found</BodyText>
  }

  return (
    <>
      {collections.map((collection: any) => (
        <CollectionCard
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
    </>
  )
}

CollectionList.displayName = 'CollectionList'

export default CollectionList
