import { View, StyleSheet } from 'react-native'

import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import { FONTS } from '@/lib/constants'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
}

const SelectedIngredients = ({ checkIfSelected, onSelect }: Props) => {
  const { ingredientsById, ingredientCategoryIds, error, isFetching } = useIngredients()

  const selectedIngredients: { [key: string]: string } = {}
  const selectedParents: { [key: string]: string } = {}

  const findSelectedIngredients = (parentIngredientIds: string[]) => {
    parentIngredientIds.forEach((id) => {
      const ingredient = ingredientsById[id]

      if (checkIfSelected(ingredient)) {
        selectedIngredients[ingredient.id] = ingredient.name

        if (ingredient.hierarchy) {
          ingredient.hierarchy.forEach((parentIngredient) => {
            selectedParents[parentIngredient?.id] = parentIngredient?.name
          })
        }
      }

      if (ingredient.childIngredientIds) {
        findSelectedIngredients(ingredient.childIngredientIds)
      }
    })
  }

  // don't search the top level categories
  ingredientCategoryIds?.forEach((id) => {
    const ingredient = ingredientsById[id]

    if (ingredient.childIngredientIds) {
      findSelectedIngredients(ingredient.childIngredientIds)
    }
  })

  const renderIngredients = (parentIngredientIds: string[] | undefined, depth: number) => {
    if (!parentIngredientIds || parentIngredientIds.length === 0) return null

    return parentIngredientIds.map((ingredientId, index) => {
      const ingredient = ingredientsById[ingredientId]

      if (!selectedIngredients[ingredient.id] && !selectedParents[ingredient.id]) return null

      return (
        <SelectableAccordion
          key={ingredient.id}
          label={ingredient.name}
          style={[depth > 1 && { paddingLeft: 34 }, { marginTop: 12 }]}
          bodyStyle={[depth === 0 && { paddingBottom: 10 }]}
          isSelected={checkIfSelected(ingredient)}
          isOpen
          onSelect={() => onSelect(ingredient)}
          headerLabelStyle={[
            ingredient.is_brand && { fontFamily: FONTS.hells.sans.mediumItalic },
            depth === 0 && { fontFamily: FONTS.hells.sans.bold },
          ]}
          noSelect={depth === 0}
          noExpand
        >
          {renderIngredients(ingredient.childIngredientIds, depth + 1)}
        </SelectableAccordion>
      )
    })
  }

  const renderContent = () => {
    if (isFetching) {
      return <BodyText style={styles.justText}>Loading...</BodyText>
    }

    if (error) {
      return <BodyText style={styles.justText}>Error: {error.message}</BodyText>
    }

    if (!ingredientCategoryIds) {
      return <BodyText style={styles.justText}>No data</BodyText>
    }

    if (Object.keys(selectedIngredients).length === 0) {
      return <BodyText style={styles.justText}>No ingredients selected</BodyText>
    }

    return renderIngredients(ingredientCategoryIds, 0)
  }

  return <View>{renderContent()}</View>
}

const styles = StyleSheet.create({
  justText: {
    paddingTop: 20,
  },
})

SelectedIngredients.displayName = 'SelectedIngredients'

export default SelectedIngredients
