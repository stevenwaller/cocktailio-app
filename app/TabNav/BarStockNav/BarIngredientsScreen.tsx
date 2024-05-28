import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import IngredientList from '@/content/IngredientList'
import useBars from '@/lib/hooks/useBars'
import { BarStockStackParamList } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'
import uuid from '@/lib/utils/uuid'

type Props = NativeStackScreenProps<BarStockStackParamList, 'Bar Ingredients'>

export default function BarIngredients({ route }: Props) {
  const barId = route.params.barId
  const { bar, setBar } = useBars(barId as string)

  if (!bar) return null

  const checkIfSelected = (ingredient: TIngredient) => !!bar.ingredientsById[ingredient.id]

  const handleSelect = async (ingredient: TIngredient) => {
    const alreadySelected = !!bar.ingredientsById[ingredient.id]

    const newBar = {
      ...bar,
      ingredientsById: { ...bar.ingredientsById },
      bar_ingredients: [...bar.bar_ingredients],
    }

    const newBarVariables = {
      id: uuid(),
      created_at: new Date().toISOString(),
      bar_id: bar.id,
      ingredient_id: ingredient.id,
    }

    if (alreadySelected) {
      delete newBar.ingredientsById[ingredient.id]
      newBar.bar_ingredients = newBar.bar_ingredients.filter(
        (bar_ingredient) => bar_ingredient.ingredient_id !== ingredient.id,
      )
    } else {
      newBar.ingredientsById[ingredient.id] = ingredient
      newBar.bar_ingredients.push({ ...newBarVariables, ingredient })
    }

    setBar(newBar)

    if (alreadySelected) {
      await supabaseClient.from('bar_ingredients').delete().eq('ingredient_id', ingredient.id)
    } else {
      await supabaseClient.from('bar_ingredients').insert(newBarVariables).select().single()
    }
  }

  return <IngredientList onSelect={handleSelect} checkIfSelected={checkIfSelected} />
}
