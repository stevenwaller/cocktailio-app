import { useState } from 'react'

import SearchInput from '@/components/SearchInput'
import ModalBody from '@/components/_overlays/ModalBody'
import IngredientList from '@/content/IngredientList'
import { COLORS } from '@/lib/constants'
import { IFilter } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'

interface IngredientsScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const IngredientScreen = ({ filter, onChange }: IngredientsScreenProps) => {
  const [searchValue, setSearchValue] = useState('')

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

  return (
    <>
      <SearchInput
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search by ingredient name"
        inputStyle={{ backgroundColor: COLORS.bg.level1 }}
      />
      <ModalBody contentStyle={{ paddingTop: 10 }}>
        <IngredientList
          onSelect={handleSelect}
          checkIfSelected={checkIfSelected}
          searchValue={searchValue}
        />
      </ModalBody>
    </>
  )
}

IngredientScreen.displayName = 'IngredientScreen'

export default IngredientScreen
