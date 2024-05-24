import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import { FONTS, COLORS } from '@/lib/constants'
import { CocktailsStackParamList } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

type Props = NativeStackScreenProps<CocktailsStackParamList, 'Ingredient Detail'>

export default function IngredientDetailPage({ route }: Props) {
  const [isFetching, setIsFetching] = useState(false)
  const [ingredient, setIngredient] = useState<TIngredient | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const ingredientId = route.params?.ingredientId
  const name = route.params?.name

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .from('ingredients')
      .select(
        `
        *
        `,
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
    <PageContainer>
      <View style={styles.header}>
        <PageTitleText>{name}</PageTitleText>
      </View>
      {renderContent()}
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  header: {},
  description: {
    marginTop: 10,
  },
  descriptionText: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    color: COLORS.text.body,
  },
})
