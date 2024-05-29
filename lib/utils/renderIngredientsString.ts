import { TCocktail } from '@/lib/types/supabase'

export default function renderIngredientsString(cocktail: TCocktail) {
  let returnString = ''

  if (!cocktail.components) return null

  cocktail.components.forEach((component, index) => {
    if (!cocktail.components) return null

    const isLastComponent = index === cocktail.components.length - 1
    component.ingredients.forEach((ingredient) => {
      returnString += ingredient.ingredient.name

      if (!isLastComponent) returnString += ', '
    })
  })

  return returnString
}
