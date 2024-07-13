import { PostgrestError } from '@supabase/supabase-js'

import { TIngredientById } from '@/lib/contexts/IngredientsContext'
import { TBar, TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'
import uuid from '@/lib/utils/uuid'

interface Args {
  bar: TBar
  ingredient: TIngredient
  ingredientsById: TIngredientById
  setBar: (newBar: TBar) => void
  onSuccess?: (bar: TBar) => void
  onError?: (error: PostgrestError) => void
}

export default async function updateBarStock({
  bar,
  ingredient,
  ingredientsById,
  setBar,
  onSuccess = () => {},
  onError = () => {},
}: Args) {
  const alreadySelected = !!bar.ingredients_by_id[ingredient.id]
  const ogBar = { ...bar }
  const newBar: TBar = {
    ...bar,
    all_ingredients_by_id: {},
    ingredients_by_id: {},
    bar_ingredients: [...bar.bar_ingredients],
  }

  if (alreadySelected) {
    newBar.bar_ingredients = newBar.bar_ingredients.filter(
      (bar_ingredient) => bar_ingredient.ingredient_id !== ingredient.id,
    )
  } else {
    newBar.bar_ingredients.push({
      id: uuid(),
      created_at: new Date().toISOString(),
      bar_id: bar.id,
      ingredient_id: ingredient.id,
    })
  }

  // rebuild the ingredients by id objects
  // this is also done on the server, but we do it here to update the UI optimistically
  newBar.bar_ingredients.forEach((barIngredient) => {
    if (!barIngredient.ingredient_id) return

    const thisIngredient = ingredientsById[barIngredient.ingredient_id]

    newBar.ingredients_by_id[thisIngredient.id] = thisIngredient.name
    newBar.all_ingredients_by_id[thisIngredient.id] = thisIngredient.name

    // only add parent ids to the all_ingredients_by_id
    if (thisIngredient.hierarchy) {
      thisIngredient.hierarchy.forEach(({ id, name }, index) => {
        if (index > 0) {
          newBar.all_ingredients_by_id[id] = name
        }
      })
    }
  })

  // optimistically update the bar
  // does not include the updated cocktail_count
  setBar(newBar)

  const response = await supabaseClient.rpc('update_bar_stock', {
    bar_id: bar.id,
    ingredient_id: ingredient.id,
  })

  console.log('update bar stock response', response.data)

  if (response.error) {
    // roll back the bar changes
    setBar(ogBar)
    onError(response.error)
    return
  }

  const savedBar = {
    ...newBar,
    all_ingredients_by_id: response.data.all_ingredients_by_id,
    ingredients_by_id: response.data.ingredients_by_id,
    cocktail_count: response.data.cocktail_count,
  }

  // sync database responses with local state
  // this will also include the updated cocktail_count
  if (response.data) {
    setBar(savedBar)
  }

  onSuccess(savedBar)
}
