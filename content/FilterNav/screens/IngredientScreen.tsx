import { useState } from 'react'
import { StyleSheet } from 'react-native'

import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import ModalBody from '@/components/_overlays/ModalBody'
import IngredientList from '@/content/IngredientList'
import { COLORS, FONTS } from '@/lib/constants'
import useIngredients from '@/lib/hooks/useIngredients'
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

  return (
    <ModalBody>
      <IngredientList onSelect={handleSelect} checkIfSelected={checkIfSelected} />
    </ModalBody>
  )
}

IngredientScreen.displayName = 'IngredientScreen'

export default IngredientScreen
