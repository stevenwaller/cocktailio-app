import { useHeaderHeight } from '@react-navigation/elements'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import IngredientTabs from '@/content/IngredientTabs'
import { COLORS } from '@/lib/constants'
import { useBars } from '@/lib/contexts/BarsContext'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { BarStockStackParamList } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'
import updateBarStock from '@/lib/utils/updateBarStock'

type Props = NativeStackScreenProps<BarStockStackParamList, 'Bar Ingredients'>

export default function BarIngredients({ route, navigation }: Props) {
  const barId = route.params.barId
  const { bar, setBar } = useBars(barId as string)
  const { ingredientsById } = useIngredients()
  const headerHeight = useHeaderHeight()

  if (!bar) return null

  const checkIfSelected = (ingredient: TIngredient) => {
    return !!bar.ingredients_by_id[ingredient.id]
  }

  const handleSelect = async (ingredient: TIngredient) => {
    updateBarStock({
      bar,
      ingredient,
      ingredientsById,
      setBar,
      onError: () => {
        // TODO: show error in toast
      },
    })
  }

  const handleDeselectAll = async () => {
    const barIngredientIds = bar.bar_ingredients.map((barIngredient) => barIngredient.id)

    setBar({
      ...bar,
      all_ingredients_by_id: {},
      ingredients_by_id: {},
      bar_ingredients: [],
      cocktail_count: 0,
    })

    // TODO: handle error
    await supabaseClient.from('bar_ingredients').delete().in('id', barIngredientIds)

    await supabaseClient
      .from('bars')
      .update({
        all_ingredients_by_id: {},
        ingredients_by_id: {},
      })
      .eq('id', bar.id)
  }

  return (
    <IngredientTabs
      checkIfSelected={checkIfSelected}
      onSelect={handleSelect}
      onDeselectAll={handleDeselectAll}
    />
  )
}
