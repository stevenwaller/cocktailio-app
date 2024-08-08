import FilterItemsList from '../components/FilterItemsList'

import ModalBody from '@/components/_overlays/ModalBody'
import { useGlasses } from '@/lib/contexts/GlassesContext'
import { IFilter } from '@/lib/types'
import { TGlass } from '@/lib/types/supabase'

interface GlasswareScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const GlasswareScreen = ({ filter, onChange }: GlasswareScreenProps) => {
  const { isFetching, error, glasses } = useGlasses()

  return (
    <ModalBody>
      <FilterItemsList<TGlass>
        isFetching={isFetching}
        error={error}
        items={glasses}
        filter={filter}
        numberOfPlaceholders={20}
        onChange={onChange}
      />
    </ModalBody>
  )
}

GlasswareScreen.displayName = 'GlasswareScreen'

export default GlasswareScreen
