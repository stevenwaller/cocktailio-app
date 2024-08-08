import FilterItemsList from '../components/FilterItemsList'

import ModalBody from '@/components/_overlays/ModalBody'
import { useCollections } from '@/lib/contexts/CollectionsContext'
import { IFilter } from '@/lib/types'
import { TCollection } from '@/lib/types/supabase'

interface CollectionScreenProps {
  filter?: IFilter
  onChange: (filterName: IFilter) => void
}

const CollectionScreen = ({ filter, onChange }: CollectionScreenProps) => {
  const { isFetching, error, collections } = useCollections()

  return (
    <ModalBody>
      <FilterItemsList<TCollection>
        isFetching={isFetching}
        error={error}
        items={collections}
        filter={filter}
        description="Filter cocktails by what you have in a collection"
        noItemsDescription='You have not added a collection yet. Go to the "Collections" tab to do so.'
        numberOfPlaceholders={1}
        onChange={onChange}
      />
    </ModalBody>
  )
}

CollectionScreen.displayName = 'CollectionScreen'

export default CollectionScreen
