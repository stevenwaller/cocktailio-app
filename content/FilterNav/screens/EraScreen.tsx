import FilterItemsList from '../components/FilterItemsList'

import ModalBody from '@/components/_overlays/ModalBody'
import { useEras } from '@/lib/contexts/ErasContext'
import { IFilter } from '@/lib/types'
import { TEra } from '@/lib/types/supabase'

interface EraScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const EraScreen = ({ filter, onChange }: EraScreenProps) => {
  const { isFetching, error, eras } = useEras()

  return (
    <ModalBody>
      <FilterItemsList<TEra>
        isFetching={isFetching}
        error={error}
        items={eras}
        filter={filter}
        numberOfPlaceholders={6}
        onChange={onChange}
      />
    </ModalBody>
  )
}

EraScreen.displayName = 'EraScreen'

export default EraScreen
