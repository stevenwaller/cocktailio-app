import { TCocktail } from '@/lib/types/supabase'

export default function renderIngredientsString(cocktail: TCocktail) {
  let returnString = ''

  if (!cocktail.components) return null

  cocktail.components.sort((a, b) => {
    if (a.order === null || b.order === null) {
      return 0
    }

    return a.order - b.order
  })

  cocktail.components.forEach((component, componentIndex) => {
    if (!cocktail.components) return null

    const length = component.ingredients.length
    const isLastComponent = componentIndex === cocktail.components.length - 1

    if (length === 0) return null

    returnString += component.ingredients[0].ingredient.name

    if (!isLastComponent) returnString += ' · '
  })

  return returnString
}
