import { Text, View, ViewStyle } from 'react-native'

import CircleCheckFilled from '@/components/_icons/CircleCheckFilled'
import { COLORS, FONTS } from '@/lib/constants'
import { TCocktail, TBar } from '@/lib/types/supabase'

interface Props {
  cocktail?: TCocktail
  bar?: TBar
  style?: ViewStyle
  width?: number
  height?: number
  showCount?: boolean
}

const CanMake = ({ cocktail, bar, width, height, style, showCount = false }: Props) => {
  const matchedComponents = []

  if (!bar || !cocktail) return null

  if (!cocktail.components || cocktail.components.length === 0) {
    return null
  }

  cocktail.components.forEach((component) => {
    let hasMatch = false

    if (component.ingredients && component.ingredients.length > 0) {
      component.ingredients.forEach((ingredient) => {
        if (bar.all_ingredients_by_id[ingredient.ingredient_id]) {
          hasMatch = true
        }
      })
    }

    if (component.or_ingredients && component.or_ingredients.length > 0) {
      component.or_ingredients.forEach((ingredient) => {
        if (bar.all_ingredients_by_id[ingredient.ingredient_id]) {
          hasMatch = true
        }
      })
    }

    if (component.recommended_ingredients && component.recommended_ingredients.length > 0) {
      component.recommended_ingredients.forEach((ingredient) => {
        if (bar.all_ingredients_by_id[ingredient.ingredient_id]) {
          hasMatch = true
        }
      })
    }

    if (hasMatch) {
      matchedComponents.push(component)
    }
  })

  const showCheck = matchedComponents.length === cocktail.components.length

  if (!showCheck && !showCount) return null

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {showCount && (
        <Text
          style={{
            color: COLORS.text.body,
            fontSize: 12,
            fontFamily: FONTS.hells.sans.medium,
            ...(showCheck ? { marginRight: 5 } : {}),
          }}
        >
          {matchedComponents.length}/{cocktail.components.length}
        </Text>
      )}
      {showCheck && <CircleCheckFilled color={COLORS.text.good} width={width} height={height} />}
    </View>
  )
}

CanMake.displayName = 'CanMake'

export default CanMake
