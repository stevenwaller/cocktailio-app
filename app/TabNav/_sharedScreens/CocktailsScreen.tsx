import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback, useRef } from 'react'
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'

import CocktailCard from '@/components/CocktailCard'
import ErrorAlert from '@/components/ErrorAlert'
import FiltersBar from '@/components/FiltersBar'
import PageContainer from '@/components/PageContainer'
import AddToCollectionModal, { IAddToCollectionModal } from '@/content/AddToCollectionModal'
import { COLORS, FONTS, SIZE } from '@/lib/constants'
import useCollections from '@/lib/hooks/useCollections'
import { CocktailsStackParamList, IFilter } from '@/lib/types'
import { TCocktail } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const itemsToLoad = 10

type Props = NativeStackScreenProps<CocktailsStackParamList, 'Cocktails'>

export default function CocktailsScreen({ route }: Props) {
  const addToCollectionModalRef = useRef<IAddToCollectionModal | null>(null)
  const [minRange, setMinRange] = useState<number>(0)
  const [maxRange, setMaxRange] = useState<number>(itemsToLoad - 1)
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<TCocktail[]>([])
  const [error, setError] = useState<PostgrestError | null>(null)
  const [cocktailToBookmark, setCocktailToBookmark] = useState<TCocktail | null>(null)
  const [count, setCount] = useState<number>(0)
  const { collections } = useCollections()
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(false)

  const barIdParam = route.params?.barId
  const collectionIdParam = route.params?.collectionId
  const nameParam = route.params?.name

  // TODO: use enum for consistent names
  const [filters, setFilters] = useState<IFilter[]>([
    {
      name: 'With Bar Stock',
      value: barIdParam
        ? [
            {
              id: barIdParam as string,
              name: nameParam as string,
            },
          ]
        : [],
    },
    {
      name: 'Collection',
      value: collectionIdParam
        ? [
            {
              id: collectionIdParam as string,
              name: nameParam as string,
            },
          ]
        : [],
    },
    {
      name: 'Base Spirit',
      rowName: 'base_ingredient_id',
      value: [],
    },
    {
      name: 'Ingredient',
      value: [],
    },
    {
      name: 'Source',
      value: [],
    },
    {
      name: 'Method',
      rowName: 'method_id',
      value: [],
    },
    {
      name: 'Era',
      rowName: 'era_id',
      value: [],
    },
    {
      name: 'Glassware',
      rowName: 'glass_id',
      value: [],
    },
  ])

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    // To filter by Bar we need to provide the bar_id
    let barId = null
    const barStockFilter = filters.find((filter) => filter.name === 'With Bar Stock')

    if (barStockFilter) {
      if (barStockFilter.value.length > 0) {
        barId = barStockFilter.value[0].id
      }
    }

    // To filter by Ingredients we need an object where the key is the ingredient id
    const ingredientFilter: Record<string, string> = {}

    filters
      .find((filter) => filter.name === 'Ingredient')
      ?.value.forEach((item) => {
        ingredientFilter[item.id] = item.name
      })

    const query = supabaseClient
      .rpc(
        'query_cocktails',
        {
          bar_id: barId,
          filter_ingredients: ingredientFilter,
          filter_sources: filters
            .find((filter) => filter.name === 'Source')
            ?.value.map((item) => item.id),
        },
        { count: 'exact' },
      )
      .order('name')
      .range(minRange, maxRange)

    filters.forEach((filter) => {
      const values = filter.value.map((item) => item.id)

      switch (filter.name) {
        case 'Base Spirit':
        case 'Method':
        case 'Era':
        case 'Glassware':
          if (values.length > 0) {
            query.in(filter.rowName ? filter.rowName : '', values)
          }
          break
        default:
          break
      }
    })

    const response = await query.returns<TCocktail[]>()

    setIsFetching(false)
    setData((prevData) => {
      return response.data ? [...prevData, ...response.data] : prevData
    })
    setError(response.error)
    setCount(response.count ? response.count : 0)
    setIsFirstPageReceived(true)
  }, [minRange, maxRange, filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const fetchNextPage = () => {
    if (maxRange + itemsToLoad >= count) return

    setMinRange(minRange + itemsToLoad)
    setMaxRange(maxRange + itemsToLoad)
  }

  const handleFilterApply = (newFilters: IFilter[]) => {
    setFilters([...newFilters])
    setIsFirstPageReceived(false)
    setMinRange(0)
    setMaxRange(itemsToLoad - 1)
    setData([])
  }

  const handleBookmark = async (cocktail: TCocktail) => {
    setCocktailToBookmark(cocktail)

    addToCollectionModalRef.current?.present()
  }

  const checkIfBookmarked = (cocktailId: string): boolean => {
    let isBookmarked = false

    if (!collections) return isBookmarked

    collections.forEach((collection) => {
      if (collection.cocktail_ids_by_id[cocktailId]) {
        isBookmarked = true
      }
    })

    return isBookmarked
  }

  const renderContent = () => {
    if (isFirstPageReceived === false && isFetching) {
      return (
        <PageContainer style={styles.pageContainer}>
          <ActivityIndicator size="small" />
        </PageContainer>
      )
    }

    if (data.length === 0) {
      return (
        <PageContainer style={styles.pageContainer}>
          <Text style={styles.title}>No data found</Text>
        </PageContainer>
      )
    }

    return (
      <SafeAreaView style={{ marginTop: 54 }}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.header}>
              <ErrorAlert message={error?.message} />
              <Text style={styles.count}>{count} cocktails</Text>
            </View>
          }
          data={data}
          renderItem={({ item }) => (
            <CocktailCard
              style={styles.card}
              key={item.id}
              cocktail={item}
              onBookmarkPress={handleBookmark}
              isBookmarked={checkIfBookmarked(item.id)}
            />
          )}
          keyExtractor={(cocktail) => cocktail.id}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={fetchData}
              tintColor={COLORS.text.body}
            />
          }
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.8}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <ActivityIndicator animating={isFirstPageReceived && isFetching} />
            </View>
          )}
        />
      </SafeAreaView>
    )
  }

  return (
    <>
      <View>
        <FiltersBar
          style={{ position: 'absolute', zIndex: 100 }}
          filters={filters}
          onApply={handleFilterApply}
        />
        {renderContent()}
      </View>
      <AddToCollectionModal ref={addToCollectionModalRef} cocktail={cocktailToBookmark} />
    </>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: 54 + SIZE.marginY,
  },
  header: {
    paddingTop: SIZE.marginY,
    paddingLeft: SIZE.app.paddingX,
    paddingRight: SIZE.app.paddingX,
  },
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
  },
  count: {
    fontSize: 16,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.mediumItalic,
    marginBottom: 20,
  },
  card: {
    marginLeft: SIZE.app.paddingX,
    marginRight: SIZE.app.paddingX,
    marginBottom: 20,
  },
  footer: {
    height: 40,
  },
})
