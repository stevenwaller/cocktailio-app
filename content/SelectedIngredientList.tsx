import { Text, View, StyleSheet } from 'react-native'

import { BodyText } from '@/components/_elements/Text'
import { FONTS, COLORS } from '@/lib/constants'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
  searchValue?: string
}

const SelectedIngredientList = ({ checkIfSelected, onSelect, searchValue = '' }: Props) => {
  const { ingredientsById, ingredientCategoryIds, error, isFetching } = useIngredients()

  const lowerCaseSearchValue = searchValue.toLowerCase()
  const foundIngredients: { [key: string]: string } = {}

  const findIngredients = (parentIngredientIds: string[]) => {
    parentIngredientIds.forEach((id) => {
      const ingredient = ingredientsById[id]

      if (ingredient.name.toLowerCase().includes(lowerCaseSearchValue)) {
        foundIngredients[ingredient.name] = ingredient.id

        if (ingredient.hierarchy) {
          ingredient.hierarchy.forEach((parentIngredient) => {
            foundIngredients[parentIngredient?.name] = parentIngredient?.id
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

  if (isFetching) {
    return <BodyText>Loading...</BodyText>
  }

  if (error) {
    return <BodyText>Error: {error.message}</BodyText>
  }

  if (!ingredientCategoryIds) {
    return <BodyText>No data</BodyText>
  }

  if (searchValue !== '' && Object.keys(foundIngredients).length === 0) {
    return <BodyText>No results found</BodyText>
  }

  return (
    <View style={styles.ingredientsContainer}>
      {ingredientCategoryIds.map((id) => (
        <View key={id} style={styles.category}>
          <Text style={styles.categoryLabel}>{ingredientsById[id].name}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  category: {
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.bold,
  },
  ingredientsContainer: {
    paddingTop: 22,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 20,
  },
})

SelectedIngredientList.displayName = 'SelectedIngredientList'

export default SelectedIngredientList
