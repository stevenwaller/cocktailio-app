import { PostgrestError } from '@supabase/supabase-js'

import { TBar, TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'
import uuid from '@/lib/utils/uuid'

interface Args {
  bar: TBar
  ingredient: TIngredient
  setBar: (newBar: TBar) => void
  onSuccess?: (bar: TBar) => void
  onError?: (error: PostgrestError) => void
}

export default async function updateBarStock({
  bar,
  ingredient,
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
  const newBarIngredientVariables = {
    id: uuid(),
    created_at: new Date().toISOString(),
    bar_id: bar.id,
    ingredient_id: ingredient.id,
  }

  if (alreadySelected) {
    newBar.bar_ingredients = newBar.bar_ingredients.filter(
      (bar_ingredient) => bar_ingredient.ingredient_id !== ingredient.id,
    )
  } else {
    newBar.bar_ingredients.push({ ...newBarIngredientVariables, ingredient })
  }

  // rebuild the ingredients by id objects
  newBar.bar_ingredients.forEach((barIngredient) => {
    const thisIngredient = barIngredient.ingredient

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
  setBar(newBar)

  const response = await supabaseClient.rpc('update_bar_stock', {
    bar_id: bar.id,
    ingredient_id: ingredient.id,
  })

  const savedBar = {
    ...newBar,
    all_ingredients_by_id: response.data[0].all_ingredients_by_id,
    ingredients_by_id: response.data[0].ingredients_by_id,
  }

  // sync database responses with local state
  if (response.data) {
    setBar(savedBar)
  }

  if (response.error) {
    // roll bar the bar changes
    setBar(ogBar)
    onError(response.error)
  } else {
    onSuccess(savedBar)
  }
}
