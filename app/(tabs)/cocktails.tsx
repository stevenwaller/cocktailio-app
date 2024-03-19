import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { Text, View } from '@/components/Themed'
import { Tables } from '@/lib/types/supabaseGenerated'
import supabaseClient from '@/lib/utils/supabaseClient'

const fetchData = (args: { minRange: number; maxRange: number }) => {
  return supabaseClient
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
    .range(args.minRange, args.maxRange)
}

export default function CocktailsScreen() {
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [isFormFetching, setIsFormFetching] = useState(false)

  useEffect(() => {
    fetchData({ minRange: 0, maxRange: 10 })
  }, [fetchData])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cocktails</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
