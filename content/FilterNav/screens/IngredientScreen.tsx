import ModalBody from '@/components/_overlays/ModalBody'
import IngredientTabs from '@/content/IngredientTabs'
import { IFilter } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'

interface IngredientsScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const IngredientScreen = ({ filter, onChange }: IngredientsScreenProps) => {
  const checkIfSelected = (ingredient: TIngredient) => {
    if (filter) {
      return filter.value.some((item) => item.id === ingredient.id)
    } else {
      return false
    }
  }

  const handleSelect = (ingredient: TIngredient) => {
    if (!filter) return

    const newFilter = { ...filter, value: [...filter.value] }

    if (newFilter.value.some((item) => item.id === ingredient.id)) {
      newFilter.value = newFilter.value.filter((item) => item.id !== ingredient.id)
    } else {
      newFilter.value.push({ id: ingredient.id, name: ingredient.name })
    }

    onChange(newFilter)
  }

  const handleDeselectAll = () => {
    if (!filter) return

    onChange({ ...filter, value: [] })
  }

  return (
    <ModalBody contentStyle={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
      <IngredientTabs
        checkIfSelected={checkIfSelected}
        onSelect={handleSelect}
        onDeselectAll={handleDeselectAll}
      />
    </ModalBody>
  )
}

IngredientScreen.displayName = 'IngredientScreen'

export default IngredientScreen
