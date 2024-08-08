import FilterItemsList from '../components/FilterItemsList'

import ModalBody from '@/components/_overlays/ModalBody'
import { useBars } from '@/lib/contexts/BarsContext'
import { IFilter } from '@/lib/types'
import { TBar } from '@/lib/types/supabase'

interface WithBarStockScreenProps {
  filter?: IFilter
  onChange: (filterName: IFilter) => void
}

const WithBarStockScreen = ({ filter, onChange }: WithBarStockScreenProps) => {
  const { isFetching, error, bars } = useBars()

  return (
    <ModalBody>
      <FilterItemsList<TBar>
        isFetching={isFetching}
        error={error}
        items={bars}
        filter={filter}
        description="Filter cocktails by ingredients you have stocked in your bar"
        noItemsDescription='You have not added a bar yet. Go to the "Bar Stock" tab to do so.'
        numberOfPlaceholders={1}
        onChange={onChange}
      />
    </ModalBody>
  )
}

WithBarStockScreen.displayName = 'WithBarStockScreen'

export default WithBarStockScreen
