import { PostgrestError } from '@supabase/supabase-js'
import { useState, useCallback, useEffect } from 'react'

import CocktailScroller from '@/components/CocktailScroller'
import { TCocktail, TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface Props {
  label?: string
  cocktailIds?: string[]
  currentBar?: TBar
  ingredientId?: string
  maxToShow?: number
  onViewAllPress?: () => void
}

export default function RecentCocktails({
  cocktailIds,
  label,
  currentBar,
  ingredientId,
  maxToShow,
  onViewAllPress = () => {},
}: Props) {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [cocktails, setCocktails] = useState<TCocktail[] | null>(null)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const query = supabaseClient
      .rpc('query_cocktails', {
        bar_id: null,
        collection_id: null,
        search_value: null,
        filter_ingredients: null,
      })
      .range(0, 10)

    if (cocktailIds) {
      query.in('id', cocktailIds)
    }

    const response = await query

    setIsFetching(false)
    setCocktails(response.data)
    setError(response.error)
  }, [cocktailIds])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <CocktailScroller
      label="Recently Added"
      isFetching={isFetching}
      error={error}
      cocktails={cocktails}
      maxToShow={maxToShow}
      currentBar={currentBar}
      onViewAllPress={onViewAllPress}
    />
  )
}
