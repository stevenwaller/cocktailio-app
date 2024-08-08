import FilterItemsList from '../components/FilterItemsList'

import ModalBody from '@/components/_overlays/ModalBody'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { IFilter } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'

interface BaseSpiritScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const BaseSpiritScreen = ({ filter, onChange }: BaseSpiritScreenProps) => {
  const { baseSpirits, isFetching, error } = useIngredients()

  return (
    <ModalBody>
      <FilterItemsList<TIngredient>
        isFetching={isFetching}
        error={error}
        items={baseSpirits}
        filter={filter}
        numberOfPlaceholders={20}
        onChange={onChange}
      />
    </ModalBody>
  )
}

BaseSpiritScreen.displayName = 'BaseSpiritScreen'

export default BaseSpiritScreen
