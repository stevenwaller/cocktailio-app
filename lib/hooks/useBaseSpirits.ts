import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback } from 'react'

import useBaseSpiritStore from '@/lib/stores/useBaseSpiritStore'
import { TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useBaseSpirits = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const spirits = useBaseSpiritStore((state) => state.spirits)
  const setSpirits = useBaseSpiritStore((state) => state.setSpirits)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .from('ingredients')
      .select(`*`)
      .eq('is_base', true)
      .returns<TIngredient[]>()

    setIsFetching(false)

    if (response.data) {
      setSpirits(response.data)
    }
    setError(response.error)
  }, [setSpirits])

  useEffect(() => {
    if (!spirits || spirits.length === 0) {
      fetchData()
    }
  }, [spirits, fetchData])

  return { isFetching, fetchData, error, spirits, setSpirits }
}

export default useBaseSpirits
