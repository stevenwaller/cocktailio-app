import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'

import ErrorAlert from '@/components/ErrorAlert'
import { TCocktails } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const itemsToLoad = 10

export default function CocktailsScreen() {
  const [minRange, setMinRange] = useState<number>(0)
  const [maxRange, setMaxRange] = useState<number>(itemsToLoad - 1)
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<TCocktails[] | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [count, setCount] = useState<number | null>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .from('cocktails')
      .select(
        `
      *,
      base_ingredient:ingredients!public_cocktails_base_ingredient_uuid_fkey(*),
      recipes!public_recipes_cocktail_uuid_fkey(
        *,
        steps:recipe_steps(*),
        source:sources(*),
        components:recipe_components(
          *,
          measurement:measurements(*),
          ingredient:recipe_component_ingredients(*),
          or_ingredient:recipe_component_or_ingredients(*),
          pref_ingredient:recipe_component_pref_ingredients(*)
        )
      )
    `,
        { count: 'exact' }
      )
      .order('name')
      .range(minRange, maxRange)
      .returns<TCocktails[]>()

    console.log('response', response)

    setIsFetching(false)
    setData(response.data)
    setError(response.error)
    setCount(response.count)
  }, [minRange, maxRange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const renderContent = () => {
    if (isFetching) {
      return <Text style={styles.title}>Loading...</Text>
    }

    if (!data) {
      return <Text style={styles.title}>No data</Text>
    }

    return data.map((cocktail) => (
      <View key={cocktail.id}>
        <Text style={styles.title}>{cocktail.name}</Text>
      </View>
    ))
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <ErrorAlert message={error?.message} />
        {renderContent()}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
