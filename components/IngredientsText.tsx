import { Fragment } from 'react'
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native'

import { FONTS, COLORS } from '@/lib/constants'
import { TCocktail, TBar } from '@/lib/types/supabase'

interface Props extends TextProps {
  cocktail: TCocktail
  bar?: TBar
  isInBarStyle?: TextStyle
}

const IngredientsText = ({ cocktail, bar, style, isInBarStyle }: Props) => {
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

        const isLastComponent = componentIndex === cocktail.components.length - 1
        const ingredient = component.ingredients[0].ingredient
        const isInBar = !!bar?.all_ingredients_by_id[ingredient.id]

        return (
          <Fragment key={component.id}>
            <Text style={isInBar && [styles.isInBar, isInBarStyle]}>
              {component.ingredients[0].ingredient.name}
            </Text>
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
