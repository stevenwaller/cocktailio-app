import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback } from 'react'

import useBarStore from '@/lib/stores/useBarStore'
import { TBar, TIngredientsById } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useBars = (barId?: string) => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const bars = useBarStore((state) => state.bars)
  const bar = useBarStore((state) => state.bars.find((barItem) => barItem.id === barId))
  const setBars = useBarStore((state) => state.setBars)
  const setBar = useBarStore((state) => state.setBar)

  const fetchData = useCallback(async () => {
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
      response.data.forEach((barItem) => {
        const ingredientsById: TIngredientsById = {}

        barItem.bar_ingredients.forEach((barIngredient) => {
          ingredientsById[barIngredient.ingredient.id] = barIngredient.ingredient
        })

        barItem.ingredientsById = ingredientsById
      })

      setBars(response.data)
    }
    setError(response.error)
  }, [setBars])

  useEffect(() => {
    if (!bars || bars.length === 0) {
      fetchData()
    }
  }, [bars, fetchData])

  return { isFetching, fetchData, error, bar, bars, setBars, setBar }
}

export default useBars
