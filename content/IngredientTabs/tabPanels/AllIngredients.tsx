import { useState } from 'react'
import { View } from 'react-native'

import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import Skeleton from '@/components/_loaders/Skeleton'
import { FONTS, COLORS } from '@/lib/constants'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
  onDeselectAll?: () => void
}

const IngredientList = ({ checkIfSelected, onSelect, onDeselectAll }: Props) => {
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({})
  const { ingredientsById, ingredientCategoryIds, error, isFetching } = useIngredients()

  const getSelectedCount = (ingredient: TIngredient) => {
    let count = 0

    const getChildCount = (childIngredientIds: string[]) => {
      childIngredientIds.forEach((childId) => {
        const child = ingredientsById[childId]

        if (checkIfSelected(child)) {
          count++
        }
        if (child.childIngredientIds) {
          getChildCount(child.childIngredientIds)
        }
      })
    }

    if (ingredient.childIngredientIds) {
      getChildCount(ingredient.childIngredientIds)
    }

    return count
  }

  const handleToggle = (ingredient: TIngredient) => {
    const newOpenAccordions = { ...openAccordions }

    if (openAccordions[ingredient.id]) {
      delete newOpenAccordions[ingredient.id]

      const closeChildren = (parentIngredient: TIngredient) => {
        parentIngredient.childIngredientIds?.forEach((childId) => {
          delete newOpenAccordions[childId]
          closeChildren(ingredientsById[childId])
        })
      }

      closeChildren(ingredient)
    } else {
      // close all other open accordions
      Object.keys(newOpenAccordions).forEach((key) => {
        delete newOpenAccordions[key]
      })

      // keep parent open
      ingredient.hierarchy?.forEach((hierarchy) => {
        newOpenAccordions[hierarchy.id] = true
      })

      newOpenAccordions[ingredient.id] = true
    }

    setOpenAccordions(newOpenAccordions)
  }

  const renderIngredients = (parentIngredientIds: string[] | undefined, depth: number) => {
    if (!parentIngredientIds || parentIngredientIds.length === 0) return null

    return parentIngredientIds.map((ingredientId, index) => {
      const ingredient = ingredientsById[ingredientId]

      return (
        <SelectableAccordion
          key={ingredient.id}
          label={ingredient.name}
          style={[depth > 1 && { paddingLeft: 34 }, { marginTop: 12 }]}
          bodyStyle={[depth === 0 && { paddingBottom: 10 }]}
          isSelected={checkIfSelected(ingredient)}
          isOpen={openAccordions[ingredient.id]}
          onToggle={() => handleToggle(ingredient)}
          onSelect={() => onSelect(ingredient)}
          headerLabelStyle={[
            ingredient.is_brand && { fontFamily: FONTS.hells.sans.mediumItalic },
            depth === 0 && { fontFamily: FONTS.hells.sans.bold },
          ]}
          count={getSelectedCount(ingredient)}
          noSelect={depth === 0}
        >
          {renderIngredients(ingredient.childIngredientIds, depth + 1)}
        </SelectableAccordion>
      )
    })
  }

  if (isFetching) {
    const placeholders = []
    for (let i = 0; i < 21; i++) {
      placeholders.push(
        <Skeleton key={i} style={{ marginBottom: 15 }} bgColor={COLORS.bg.level4} height={20} />,
      )
    }

    return <View style={{ marginTop: 13 }}>{placeholders}</View>
  }

  if (error) {
    return <BodyText>Error: {error.message}</BodyText>
  }

  if (!ingredientCategoryIds) {
    return <BodyText>No data</BodyText>
  }

  return renderIngredients(ingredientCategoryIds, 0)
}

IngredientList.displayName = 'IngredientList'

export default IngredientList
