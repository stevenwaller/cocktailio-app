import { PostgrestError } from '@supabase/supabase-js'
import { Stack, Link, useLocalSearchParams } from 'expo-router'
import { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, ScrollView, Text, View, Pressable } from 'react-native'

import CocktailCard from '@/components/CocktailCard'
import ErrorAlert from '@/components/ErrorAlert'
import FiltersBar from '@/components/FiltersBar'
import PageContainer from '@/components/PageContainer'
import SearchIcon from '@/components/_icons/Search'
import AddToCollectionModal, { IAddToCollectionModal } from '@/content/AddToCollectionModal'
import { COLORS, FONTS, SIZE } from '@/lib/constants'
import useCollections from '@/lib/hooks/useCollections'
import { IFilter } from '@/lib/types'
import { TCocktail } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const itemsToLoad = 100

export default function Cocktails() {
  const addToCollectionModalRef = useRef<IAddToCollectionModal | null>(null)
  const [minRange, setMinRange] = useState<number>(0)
  const [maxRange, setMaxRange] = useState<number>(itemsToLoad - 1)
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<TCocktail[] | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [cocktailToBookmark, setCocktailToBookmark] = useState<TCocktail | null>(null)
  const [count, setCount] = useState<number | null>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { collections } = useCollections()
  const { barId, collectionId, name } = useLocalSearchParams()

  // TODO: use enum for consistent names
  const [filters, setFilters] = useState<IFilter[]>([
    {
      index: 0,
      name: 'With Bar Stock',
      value: barId
        ? [
            {
              id: barId as string,
              name: name as string,
            },
          ]
        : [],
    },
    {
      index: 1,
      name: 'Collection',
      value: collectionId
        ? [
            {
              id: collectionId as string,
              name: name as string,
            },
          ]
        : [],
    },
    {
      index: 2,
      name: 'Base Spirit',
      value: [],
    },
    {
      index: 3,
      name: 'Ingredient',
      value: [],
    },
    {
      index: 4,
      name: 'Source',
      value: [],
    },
    {
      index: 5,
      name: 'Method',
      value: [],
    },
    {
      index: 6,
      name: 'Era',
      value: [],
    },
    {
      index: 7,
      name: 'Glassware',
      value: [],
    },
  ])

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    let barId = null
    const barStockFilter = filters.find((filter) => filter.name === 'With Bar Stock')
    if (barStockFilter) {
      if (barStockFilter.value.length > 0) {
        barId = barStockFilter.value[0].id
      }
    }

    const ingredientFilter: Record<string, string> = {}

    filters
      .find((filter) => filter.name === 'Ingredient')
      ?.value.forEach((item) => {
        ingredientFilter[item.id] = item.name
      })

    const query = supabaseClient.rpc('query_cocktails', {
      bar_id: barId,
      filter_ingredients: ingredientFilter,
      filter_sources: filters
        .find((filter) => filter.name === 'Source')
        ?.value.map((item) => item.id),
    })

    filters.forEach((filter) => {
      const values = filter.value.map((item) => item.id)

      // TODO: use row name to consolidate these
      switch (filter.name) {
        case 'Base Spirit':
          if (values.length > 0) {
            query.in(
              'base_ingredient_id',
              filter.value.map((item) => item.id),
            )
          }
          break
        case 'Method':
          if (values.length > 0) {
            query.in(
              'method_id',
              filter.value.map((item) => item.id),
            )
          }
          break
        case 'Era':
          if (values.length > 0) {
            query.in(
              'era_id',
              filter.value.map((item) => item.id),
            )
          }
          break
        case 'Glassware':
          if (values.length > 0) {
            query.in(
              'glass_id',
              filter.value.map((item) => item.id),
            )
          }
          break
        default:
          break
      }
    })

    const response = await query.returns<TCocktail[]>()

    setIsFetching(false)
    setData(response.data)
    setError(response.error)
    setCount(response.count)
  }, [minRange, maxRange, filters])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleApply = (newFilters: IFilter[]) => {
    setFilters([...newFilters])
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
    if (isFetching) {
      return <Text style={styles.title}>Loading...</Text>
    }

    if (!data || data.length === 0) {
      return <Text style={styles.title}>No data found</Text>
    }

    return data.map((cocktail) => (
      <CocktailCard
        key={cocktail.id}
        cocktail={cocktail}
        onBookmarkPress={handleBookmark}
        isBookmarked={checkIfBookmarked(cocktail.id)}
      />
    ))
  }

  return (
    <>
      <View>
        <FiltersBar filters={filters} onApply={handleApply} />
        <ScrollView>
          <Stack.Screen
            options={{
              title: 'Cocktails',
              headerTitleAlign: 'center',
              headerRight: () => (
                <Link
                  href={{
                    pathname: `./search`,
                  }}
                  asChild
                >
                  <Pressable>
                    <SearchIcon color={COLORS.nav.text} />
                  </Pressable>
                </Link>
              ),
            }}
          />
          <PageContainer style={styles.pageContainer}>
            <ErrorAlert message={error?.message} />
            {renderContent()}
          </PageContainer>
        </ScrollView>
      </View>
      <AddToCollectionModal ref={addToCollectionModalRef} cocktail={cocktailToBookmark} />
    </>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: SIZE.marginY,
    paddingBottom: 60,
  },
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium,
    fontWeight: 'bold',
  },
})
