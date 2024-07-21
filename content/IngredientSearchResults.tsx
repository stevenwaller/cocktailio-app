import { View, StyleSheet } from 'react-native'

import SelectableAccordion from '@/components/SelectableAccordion'
import { BodyText } from '@/components/_elements/Text'
import { FONTS, COLORS } from '@/lib/constants'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
  searchValue?: string
}

const IngredientSearchResults = ({ checkIfSelected, onSelect, searchValue = '' }: Props) => {
  const { ingredientsById, ingredientCategoryIds, error, isFetching } = useIngredients()

  const lowerCaseSearchValue = searchValue.toLowerCase()
  const foundIngredients: { [key: string]: string } = {}

  const findIngredients = (parentIngredientIds: string[]) => {
    parentIngredientIds.forEach((id) => {
      const ingredient = ingredientsById[id]

      if (ingredient.name.toLowerCase().includes(lowerCaseSearchValue)) {
        foundIngredients[ingredient.id] = ingredient.name

        if (ingredient.hierarchy) {
          ingredient.hierarchy.forEach((parentIngredient) => {
            foundIngredients[parentIngredient?.id] = parentIngredient?.name
          })
        }
      }

      if (ingredient.childIngredientIds) {
        findIngredients(ingredient.childIngredientIds)
      }
    })
  }

  // don't search the top level categories
  ingredientCategoryIds?.forEach((id) => {
    const ingredient = ingredientsById[id]

    if (ingredient.childIngredientIds) {
      findIngredients(ingredient.childIngredientIds)
    }
  })

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

  const renderIngredients = (parentIngredientIds: string[] | undefined, depth: number) => {
    if (!parentIngredientIds || parentIngredientIds.length === 0) return null

    return parentIngredientIds.map((ingredientId, index) => {
      const ingredient = ingredientsById[ingredientId]

      if (searchValue && !foundIngredients[ingredient.id]) return null

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
          count={getSelectedCount(ingredient)}
          noSelect={depth === 0}
          noExpand={searchValue !== ''}
        >
          {renderIngredients(ingredient.childIngredientIds, depth + 1)}
        </SelectableAccordion>
      )
    })
  }

  if (isFetching) {
    return <BodyText>Loading...</BodyText>
  }

  if (error) {
    return <BodyText>Error: {error.message}</BodyText>
  }

  if (!ingredientCategoryIds) {
    return <BodyText>No data</BodyText>
  }

  if (searchValue === '') {
    return null
  }

  if (searchValue !== '' && Object.keys(foundIngredients).length === 0) {
    return <BodyText>No results found</BodyText>
  }

  return (
    <View style={styles.ingredientsContainer}>{renderIngredients(ingredientCategoryIds, 0)}</View>
  )
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bg.level2,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIcon: {
    marginRight: 7,
  },
  controlText: {
    fontFamily: FONTS.hells.sans.bold,
    fontSize: 14,
    color: COLORS.text.link,
  },
  ingredientsContainer: {
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 20,
  },
})

IngredientSearchResults.displayName = 'IngredientSearchResults'

export default IngredientSearchResults
