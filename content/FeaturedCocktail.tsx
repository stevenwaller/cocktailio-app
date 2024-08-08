import { PostgrestError } from '@supabase/supabase-js'
import { useState, useEffect, useCallback } from 'react'
import { View } from 'react-native'

import CocktailCard from '@/components/CocktailCard'
import ErrorAlert from '@/components/ErrorAlert'
import { SubTitleText } from '@/components/_elements/Text'
import Skeleton from '@/components/_loaders/Skeleton'
import { useBars } from '@/lib/contexts/BarsContext'
import { TCocktail } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

export default function FeaturedCocktail() {
  const [isFetching, setIsFetching] = useState(true)
  const [cocktail, setCocktail] = useState<TCocktail | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const { defaultBar } = useBars()

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .rpc('query_cocktails', {
        bar_id: null,
        collection_id: null,
        cocktail_id: '0cd2f1a8-42c5-4fc0-a65e-5cb85d6d7467',
        search_value: null,
        filter_ingredients: null,
      })
      .returns<TCocktail>()
      .single()

    console.log('response.data', response.data)

    setIsFetching(false)
    setCocktail(response.data)
    setError(response.error)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const renderContent = () => {
    if (isFetching || !cocktail) {
      return <Skeleton height={95} />
    }

    if (error) {
      return <ErrorAlert message={error.message} />
    }

    return <CocktailCard cocktail={cocktail} bar={defaultBar} hideBookmark />
  }

  return (
    <View style={{ marginBottom: 30 }}>
      <SubTitleText style={{ marginBottom: 12 }}>Featured Cocktail</SubTitleText>
      {renderContent()}
    </View>
  )
}
