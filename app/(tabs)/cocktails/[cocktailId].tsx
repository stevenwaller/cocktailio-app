import { PostgrestError } from '@supabase/supabase-js'
import { useLocalSearchParams, Stack } from 'expo-router'
import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import RecipeCard from '@/components/RecipeCard'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import { FONTS, COLORS, SIZE } from '@/lib/constants'
import { TCocktail } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

export default function CocktailDetailPage() {
  const [isFetching, setIsFetching] = useState(false)
  const [cocktail, setCocktail] = useState<TCocktail | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const { cocktailId, name } = useLocalSearchParams()

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .from('cocktails')
      .select(
        `
        *,
        base_ingredient:ingredients(*),
        glass:glasses(*),
        era:eras(*),
        method:methods(*),
        steps:cocktail_steps(*),
        sources:cocktail_sources(
          *,
          source:sources(*)
        ),
        components:cocktail_components(
          *,
          measurement:measurements(*),
          ingredients:cocktail_component_ingredients(
            *,
            ingredient:ingredients(*)
          ),
          or_ingredients:cocktail_component_or_ingredients(
            *,
            ingredient:ingredients(*)
          ),
          pref_ingredients:cocktail_component_pref_ingredients(
            *,
            ingredient:ingredients(*)
          )
        )
        `
      )
      .eq('id', cocktailId)
      .order('order', { referencedTable: 'steps' })
      .order('order', { referencedTable: 'cocktail_components' })
      .returns<TCocktail>()
      .single()

    // console.log('response', response)

    setIsFetching(false)
    setCocktail(response.data)
    setError(response.error)
  }, [cocktailId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const renderContent = () => {
    if (isFetching) {
      return <BodyText>Loading...</BodyText>
    }

    if (error) {
      return <BodyText>Error: {error.message}</BodyText>
    }

    if (!cocktail) {
      return <BodyText>No data</BodyText>
    }

    const renderDescription = () => {
      if (!cocktail.description) return null

      return (
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{cocktail.description}</Text>
        </View>
      )
    }

    return (
      <>
        {renderDescription()}
        <RecipeCard style={styles.recipeCard} cocktail={cocktail} />
      </>
    )
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: ''
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <PageTitleText>{name}</PageTitleText>
        </View>
        {renderContent()}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZE.app.paddingY,
    paddingLeft: SIZE.app.paddingX,
    paddingRight: SIZE.app.paddingX
  },
  header: {},
  description: {
    marginTop: 10
  },
  descriptionText: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    color: COLORS.text.body
  },
  recipeCard: {
    marginTop: SIZE.app.paddingY
  }
})
