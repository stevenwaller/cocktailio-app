import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import useBarStore from '@/lib/stores/useBarStore'
import { TBar, TIngredientsById } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useBars = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const bars = useBarStore((state) => state.bars)
  const setBars = useBarStore((state) => state.setBars)

  const fetchData = async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .from('bars')
      .select(
        `
        *,
        bar_ingredients (
          *,
          ingredient:ingredients (*)
        )
        `,
      )
      .returns<TBar[]>()

    setIsFetching(false)

    if (response.data) {
      // for each bar create a new object with the ingredients by id
      response.data.forEach((bar) => {
        const ingredientsById: TIngredientsById = {}

        bar.bar_ingredients.forEach((barIngredient) => {
          ingredientsById[barIngredient.ingredient.id] = barIngredient.ingredient
        })

        bar.ingredientsById = ingredientsById
      })

      setBars(response.data)
    }
    setError(response.error)
  }

  useEffect(() => {
    if (!bars || bars.length === 0) {
      fetchData()
    }
  }, [])

  return { isFetching, fetchData, error, bars, setBars }
}

export default useBars
