import FilterItemsList from '../components/FilterItemsList'

import ModalBody from '@/components/_overlays/ModalBody'
import { useMethods } from '@/lib/contexts/MethodsContext'
import { IFilter } from '@/lib/types'
import { TMethod } from '@/lib/types/supabase'

interface MethodScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const MethodScreen = ({ filter, onChange }: MethodScreenProps) => {
  const { isFetching, error, methods } = useMethods()

  return (
    <ModalBody>
      <FilterItemsList<TMethod>
        isFetching={isFetching}
        error={error}
        items={methods}
        filter={filter}
        numberOfPlaceholders={20}
        onChange={onChange}
      />
    </ModalBody>
  )
}

MethodScreen.displayName = 'MethodScreen'

export default MethodScreen
