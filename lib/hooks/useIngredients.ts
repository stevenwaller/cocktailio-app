import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback } from 'react'

import useIngredientStore from '@/lib/stores/useIngredientStore'
import { TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useIngredients = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const ingredients = useIngredientStore((state) => state.ingredients)
  const setIngredients = useIngredientStore((state) => state.setIngredients)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .from('ingredients')
      .select(
        `
      *,
      ingredients (
        *,
        ingredients (
          *,
          ingredients (
            *
          )
        )
      )
    `,
      )
      .order('order')
      .order('name', { referencedTable: 'ingredients' })
      .is('hierarchy', null)
      .returns<TIngredient[]>()

    setIsFetching(false)

    if (response.data) {
      setIngredients(response.data)
    }
    setError(response.error)
  }, [setIngredients])

  useEffect(() => {
    if (!ingredients || ingredients.length === 0) {
      fetchData()
    }
  }, [fetchData, ingredients])

  return { isFetching, fetchData, error, ingredients, setIngredients }
}

export default useIngredients
