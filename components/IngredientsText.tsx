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

const IngredientsText = ({ cocktail, bar, style, isInBarStyle = {} }: Props) => {
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

        /**
         * When there are multiple ingredients:
         * If the bar has that ingredient selected use that one
         * If the bar has a child of that ingredient selected use that one
         *    - And style it differently since it's not directly selected
         * Otherwise just use the first ingredient
         */
        const isLastComponent = componentIndex === cocktail.components.length - 1
        let ingredient = ingredientsById[component.ingredients[0].ingredient_id]
        let textStyle: TextStyle[] = []
        const idsInBar: string[] = []
        const idsInAllBar: string[] = []

        component.ingredients.forEach((componentIngredient) => {
          if (bar?.ingredients_by_id[componentIngredient.ingredient_id]) {
            idsInBar.push(componentIngredient.ingredient_id)
          } else if (bar?.all_ingredients_by_id[componentIngredient.ingredient_id]) {
            idsInAllBar.push(componentIngredient.ingredient_id)
          }
        })

        if (idsInBar.length > 0) {
          ingredient = ingredientsById[idsInBar[0]]
          textStyle = [styles.isInBar, isInBarStyle]
        } else if (idsInAllBar.length > 0) {
          ingredient = ingredientsById[idsInAllBar[0]]
          textStyle = [styles.isInAllBar, isInBarStyle]
        }

        if (!ingredient) return null

        return (
          <Fragment key={component.id}>
            <Text style={textStyle}>{ingredient.name}</Text>
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
  isInAllBar: {
    color: COLORS.text.good,
    fontFamily: FONTS.hells.sans.mediumItalic,
  },
})

IngredientsText.displayName = 'IngredientsText'

export default IngredientsText
