import { PostgrestError } from '@supabase/supabase-js'
import { useLocalSearchParams, Stack } from 'expo-router'
import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import { FONTS, COLORS, SIZE } from '@/lib/constants'
import { TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

export default function IngredientDetailPage() {
  const [isFetching, setIsFetching] = useState(false)
  const [ingredient, setIngredient] = useState<TIngredient | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const { ingredientId, name } = useLocalSearchParams()

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .from('ingredients')
      .select(
        `
        *
        `
      )
      .eq('id', ingredientId)
      .returns<TIngredient>()
      .single()

    // console.log('response', response)

    setIsFetching(false)
    setIngredient(response.data)
    setError(response.error)
  }, [ingredientId])

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

    if (!ingredient) {
      return <BodyText>No data</BodyText>
    }

    return (
      <>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>Ingredient</Text>
          <Text style={styles.descriptionText}>{ingredient.name}</Text>
        </View>
      </>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: ''
        }}
      />
      <PageContainer>
        <View style={styles.header}>
          <PageTitleText>{name}</PageTitleText>
        </View>
        {renderContent()}
      </PageContainer>
    </>
  )
}

const styles = StyleSheet.create({
  header: {},
  description: {
    marginTop: 10
  },
  descriptionText: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    color: COLORS.text.body
  }
})
