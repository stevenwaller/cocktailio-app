import { Fragment } from 'react'
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native'

import { FONTS, COLORS } from '@/lib/constants'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { TCocktail, TBar } from '@/lib/types/supabase'

interface Props extends TextProps {
  cocktail: TCocktail
  bar?: TBar
  isInBarStyle?: TextStyle
}

const IngredientsText = ({ cocktail, bar, style, isInBarStyle }: Props) => {
  const { ingredientsById } = useIngredients()

  if (!cocktail.components) return null

  cocktail.components.sort((a, b) => {
    if (a.order === null || b.order === null) {
      return 0
    }

    return a.order - b.order
  })

  return (
    <Text style={[styles.ingredients, style]}>
      {cocktail.components.map((component, componentIndex) => {
        if (!cocktail.components) return null

        if (component.ingredients.length === 0) return null

        // TODO: if there is more than one ingredients
        // show the one that is in the bar
        const isLastComponent = componentIndex === cocktail.components.length - 1
        const ingredient = ingredientsById[component.ingredients[0].ingredient_id]
        const isInBar = !!bar?.all_ingredients_by_id[ingredient.id]

        if (!ingredient) return null

        return (
          <Fragment key={component.id}>
            <Text style={isInBar && [styles.isInBar, isInBarStyle]}>{ingredient.name}</Text>
            {!isLastComponent && ' · '}
          </Fragment>
        )
      })}
    </Text>
  )
}

const styles = StyleSheet.create({
  ingredients: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 14,
    color: COLORS.text.body,
  },
  isInBar: {
    color: COLORS.text.good,
  },
})

IngredientsText.displayName = 'IngredientsText'

export default IngredientsText
