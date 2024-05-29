import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import CocktailHeaderBtns from '../_sharedHeaderBtns/CocktailHeaderBtns'

import PageContainer from '@/components/PageContainer'
import RecipeCard from '@/components/RecipeCard'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import AddToCollectionModal, { IAddToCollectionModal } from '@/content/AddToCollectionModal'
import { FONTS, COLORS, SIZE } from '@/lib/constants'
import useCollections from '@/lib/hooks/useCollections'
import { CocktailsStackParamList } from '@/lib/types'
import { TCocktail } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

type Props = NativeStackScreenProps<CocktailsStackParamList, 'Cocktail'>

export default function CocktailDetailScreen({ route, navigation }: Props) {
  const [isFetching, setIsFetching] = useState(false)
  const [cocktail, setCocktail] = useState<TCocktail | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const { collections } = useCollections()
  const addToCollectionModalRef = useRef<IAddToCollectionModal | null>(null)
  const cocktailId = route.params?.cocktailId
  const name = route.params?.name

  const checkIfBookmarked = useCallback(() => {
    let isBookmarked = false

    if (!collections) return isBookmarked

    collections.forEach((collection) => {
      if (collection.cocktail_ids_by_id[cocktailId]) {
        isBookmarked = true
      }
    })

    return isBookmarked
  }, [collections, cocktailId])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CocktailHeaderBtns
          isBookmarked={checkIfBookmarked()}
          onBookmarkPress={() => {
            addToCollectionModalRef.current?.present()
          }}
        />
      ),
    })
  }, [navigation, checkIfBookmarked])

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
          or_ingredients:cocktail_component_ingredients(
            *,
            ingredient:ingredients(*)
          ),
          recommended_ingredients:cocktail_component_ingredients(
            *,
            ingredient:ingredients(*)
          )
        )
        `,
      )
      .eq('id', cocktailId)
      .eq('components.ingredients.type', 'Default')
      .eq('components.or_ingredients.type', 'Or')
      .eq('components.recommended_ingredients.type', 'Recommended')
      .order('order', { referencedTable: 'steps' })
      .order('order', { referencedTable: 'cocktail_components' })
      .returns<TCocktail>()
      .single()

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
    <>
      <ScrollView>
        <PageContainer>
          <View style={styles.header}>
            <PageTitleText>{name}</PageTitleText>
          </View>
          {renderContent()}
        </PageContainer>
      </ScrollView>
      <AddToCollectionModal ref={addToCollectionModalRef} cocktail={cocktail} />
    </>
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
  recipeCard: {
    marginTop: SIZE.app.paddingY,
  },
})
