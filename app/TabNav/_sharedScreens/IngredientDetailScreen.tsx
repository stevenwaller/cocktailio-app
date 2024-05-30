import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import AddInput from '@/components/_inputs/AddInput'
import AddToBarModal, { IAddToBarModal } from '@/content/AddToBarModal'
import { FONTS, COLORS } from '@/lib/constants'
import useBars from '@/lib/hooks/useBars'
import { CocktailsStackParamList } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

type Props = NativeStackScreenProps<CocktailsStackParamList, 'Ingredient'>

export default function IngredientDetailPage({ route }: Props) {
  const [isFetching, setIsFetching] = useState(false)
  const [ingredient, setIngredient] = useState<TIngredient | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const addToBarModalRef = useRef<IAddToBarModal | null>(null)
  const { bars } = useBars()
  const ingredientId = route.params?.ingredientId
  const name = route.params?.name
  let isInBar = false

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

  bars.forEach((bar) => {
    if (bar.ingredientsById[ingredientId]) {
      isInBar = true
    }
  })

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
      <PageContainer>
        <View style={styles.header}>
          <AddInput
            style={styles.addInput}
            onPress={() => addToBarModalRef.current?.present()}
            checked={isInBar}
          />
          <PageTitleText>{name}</PageTitleText>
        </View>
        {renderContent()}
      </PageContainer>
      <AddToBarModal ref={addToBarModalRef} ingredient={ingredient} />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  addInput: {
    marginRight: 10,
  },
  description: {
    marginTop: 10,
  },
  descriptionText: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    color: COLORS.text.body,
  },
})
