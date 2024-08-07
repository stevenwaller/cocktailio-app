import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'

import CocktailHeaderBtns from '../_sharedHeaderBtns/CocktailHeaderBtns'

import PageContainer from '@/components/PageContainer'
import RecipeCard from '@/components/RecipeCard'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import Skeleton from '@/components/_loaders/Skeleton'
import AddToCollectionModal, { IAddToCollectionModal } from '@/content/AddToCollectionModal'
import RelatedCocktails from '@/content/RelatedCocktails'
import { FONTS, COLORS, SIZE } from '@/lib/constants'
import { useBars } from '@/lib/contexts/BarsContext'
import { useCollections } from '@/lib/contexts/CollectionsContext'
import useIsMounted from '@/lib/hooks/useIsMounted'
import { CocktailsStackParamList } from '@/lib/types'
import { TCocktail } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

type Props = NativeStackScreenProps<CocktailsStackParamList, 'Cocktail'>

export default function CocktailDetailScreen({ route, navigation }: Props) {
  const [isFetching, setIsFetching] = useState(true)
  const [cocktail, setCocktail] = useState<TCocktail | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const { collections } = useCollections()
  const addToCollectionModalRef = useRef<IAddToCollectionModal | null>(null)
  const checkIfMounted = useIsMounted()
  const cocktailId = route.params?.cocktailId
  const barId = route.params?.barId
  const name = route.params?.name
  const relatedCocktailIds: string[] = []
  const { defaultBar, bar } = useBars(barId)
  const currentBar = bar ? bar : defaultBar

  cocktail?.related_cocktails?.forEach((relatedCocktail) => {
    if (relatedCocktail.related_cocktail_id) {
      relatedCocktailIds.push(relatedCocktail.related_cocktail_id)
    }
  })

  const checkIfBookmarked = useCallback(() => {
    let isBookmarked = false

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
      .rpc(
        'query_cocktails',
        {
          bar_id: null,
          collection_id: null,
          cocktail_id: null,
          search_value: null,
          filter_ingredients: null,
        },
        { count: 'exact' },
      )
      .eq('id', cocktailId)
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
    if (isFetching && !checkIfMounted()) {
      return <Skeleton style={styles.recipeCard} height={900} />
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
        <RecipeCard style={styles.recipeCard} cocktail={cocktail} currentBar={currentBar} />
        <RelatedCocktails
          label="Related"
          cocktailIds={relatedCocktailIds}
          currentBar={currentBar}
        />
      </>
    )
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching && checkIfMounted()}
            onRefresh={fetchData}
            tintColor={COLORS.text.body}
          />
        }
      >
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
    marginBottom: 40,
  },
})
