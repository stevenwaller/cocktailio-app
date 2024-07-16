import { useState } from 'react'

import SearchInput from '@/components/SearchInput'
import ModalBody from '@/components/_overlays/ModalBody'
import IngredientSearchResults from '@/content/IngredientSearchResults'
import { IFilter } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'

interface IngredientsScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const SearchIngredientScreen = ({ filter, onChange }: IngredientsScreenProps) => {
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
        onClear={() => setSearchValue('')}
        autoFocus
        placeholder="Search by ingredient name"
      />
      <ModalBody
        contentStyle={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}
      >
        <IngredientSearchResults
          checkIfSelected={checkIfSelected}
          onSelect={handleSelect}
          searchValue={searchValue}
        />
      </ModalBody>
    </>
  )
}

SearchIngredientScreen.displayName = 'SearchIngredientScreen'

export default SearchIngredientScreen
