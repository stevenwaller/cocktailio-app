import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PostgrestError } from '@supabase/supabase-js'
import { useState, useCallback, useEffect } from 'react'
import { ScrollView } from 'react-native'

import ErrorAlert from '@/components/ErrorAlert'
import PageContainer from '@/components/PageContainer'
import BaseSpiritList from '@/content/BaseSpiritList'
import EraList from '@/content/EraList'
import FeaturedCocktail from '@/content/FeaturedCocktail'
import FeaturedSource from '@/content/FeaturedSource'
import GlassList from '@/content/GlassList'
import MethodList from '@/content/MethodList'
import RecentCocktails from '@/content/RecentCocktails'
import { HomeStackParamList } from '@/lib/types'
import { TCocktail, TSource } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>

export default function HomeScreen({ navigation }: Props) {
  const [isFetching, setIsFetching] = useState(true)
  const [cocktail, setCocktail] = useState<TCocktail | null>(null)
  const [source, setSource] = useState<TSource | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const response = await supabaseClient.rpc('home_page')

    console.log('response.data', response.data)

    setIsFetching(false)
    setCocktail(response.data.featured_cocktail)
    setSource(response.data.featured_source)
    setError(response.error)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <ScrollView>
      <PageContainer>
        <ErrorAlert message={error?.message} />
        <FeaturedCocktail isLoading={isFetching} cocktail={cocktail} />
        <FeaturedSource isLoading={isFetching} source={source} />
        <RecentCocktails />
        <BaseSpiritList style={{ marginBottom: 20 }} />
        <MethodList style={{ marginBottom: 20 }} />
        <EraList style={{ marginBottom: 20 }} />
        <GlassList style={{ marginBottom: 20 }} />
      </PageContainer>
    </ScrollView>
  )
}
