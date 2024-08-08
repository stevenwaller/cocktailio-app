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

export default function RelatedCocktails({
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
  const [count, setCount] = useState(0)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const query = supabaseClient.rpc(
      'query_cocktails',
      {
        bar_id: null,
        collection_id: null,
        cocktail_id: null,
        search_value: null,
        filter_ingredients: ingredientId ? { [ingredientId]: true } : null,
      },
      { count: 'exact' },
    )

    if (cocktailIds) {
      query.in('id', cocktailIds)
    }

    const response = await query

    setIsFetching(false)
    setCocktails(response.data)
    setCount(response.count ? response.count : 0)
    setError(response.error)
  }, [cocktailIds, ingredientId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <CocktailScroller
      label={`${count} ${label ? `${label} ` : ''}Cocktail${count > 1 ? 's' : ''}`}
      isFetching={isFetching}
      error={error}
      cocktails={cocktails}
      maxToShow={maxToShow}
      currentBar={currentBar}
      onViewAllPress={onViewAllPress}
    />
  )
}
