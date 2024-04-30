import { useState } from 'react'
import { StyleSheet } from 'react-native'

import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import useIngredients from '@/lib/hooks/useIngredients'
import { IFilter } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'

interface IngredientsScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const IngredientScreen = ({ filter, onChange }: IngredientsScreenProps) => {
  const [openAccordions, setOpenAccordions] = useState<any>({})
  const { isFetching, error, ingredients } = useIngredients()

  const getSelectedCount = (ingredient: TIngredient) => {
    let count = 0

    const getSubCount = (subIngredients: TIngredient[]) => {
      subIngredients.forEach((subIngredient) => {
        if (filter?.value.some((item) => item.id === subIngredient.id)) {
          count++
        }
        if (subIngredient.ingredients) {
          getSubCount(subIngredient.ingredients)
        }
      })
    }

    if (ingredient.ingredients) {
      getSubCount(ingredient.ingredients)
    }

    return count
  }

  const handleToggle = (ingredient: TIngredient) => {
    const newOpenAccordions = { ...openAccordions }

    if (openAccordions[ingredient.id]) {
      delete newOpenAccordions[ingredient.id]

      const closeChildren = (ingredient: TIngredient) => {
        ingredient.ingredients?.forEach((child) => {
          delete newOpenAccordions[child.id]
          closeChildren(child)
        })
      }

      closeChildren(ingredient)
    } else {
      newOpenAccordions[ingredient.id] = {}
    }

    setOpenAccordions(newOpenAccordions)
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

  const renderIngredients = (ingredients: TIngredient[] | undefined, depth: number) => {
    if (!ingredients || ingredients.length === 0) return

    return ingredients.map((ingredient, index) => {
      return (
        <SelectableAccordion
          key={ingredient.id}
          label={ingredient.name}
          style={[styles.accordion, depth > 0 && { paddingLeft: 34 }]}
          isSelected={filter?.value.some((item) => item.id === ingredient.id)}
          isOpen={openAccordions[ingredient.id]}
          onToggle={() => handleToggle(ingredient)}
          onSelect={() => handleSelect(ingredient)}
          headerLabelStyle={
            ingredient.is_brand ? { fontFamily: FONTS.hells.sans.boldItalic } : null
          }
          count={getSelectedCount(ingredient)}
        >
          {renderIngredients(ingredient.ingredients, depth + 1)}
        </SelectableAccordion>
      )
    })
  }

  if (isFetching) return <BodyText>Loading...</BodyText>

  if (error) return <BodyText>Error: {error.message}</BodyText>

  if (!ingredients) return <BodyText>No data</BodyText>

  return (
    <ModalBody>
      {ingredients.map((ingredient) => (
        <SelectableAccordion
          key={ingredient.id}
          label={ingredient.name}
          style={styles.accordion}
          noSelect
          isOpen={openAccordions[ingredient.id]}
          onToggle={() => handleToggle(ingredient)}
          count={getSelectedCount(ingredient)}
        >
          {renderIngredients(ingredient.ingredients, 0)}
        </SelectableAccordion>
      ))}
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  ingredient: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  ingredientText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 2,
  },
  accordion: {
    marginBottom: 12,
  },
})

IngredientScreen.displayName = 'IngredientScreen'

export default IngredientScreen
