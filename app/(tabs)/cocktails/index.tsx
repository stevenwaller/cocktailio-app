import { PostgrestError } from '@supabase/supabase-js'
import { Stack } from 'expo-router'
import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'

import CocktailCard from '@/components/CocktailCard'
import ErrorAlert from '@/components/ErrorAlert'
import FiltersBar from '@/components/FiltersBar'
import PageContainer from '@/components/PageContainer'
import { COLORS, FONTS, SIZE } from '@/lib/constants'
import { IFilter } from '@/lib/types'
import { TCocktail } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const itemsToLoad = 100

export default function CocktailsScreen() {
  const [minRange, setMinRange] = useState<number>(0)
  const [maxRange, setMaxRange] = useState<number>(itemsToLoad - 1)
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<TCocktail[] | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [count, setCount] = useState<number | null>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  // TODO: use enum for consistent names
  const [filters, setFilters] = useState<IFilter[]>([
    {
      index: 0,
      name: 'With Bar Stock',
      screen: 'With Bar Stock',
      key: 'in_bar_stock',
      value: [],
    },
    {
      index: 1,
      name: 'Base Spirit',
      screen: 'Base Spirit',
      key: 'base_ingredient',
      value: [],
    },
    // {
    //   name: 'Ingredients',
    //   screen: 'INGREDIENTS',
    //   value: []
    // },
    // {
    //   name: 'Sources',
    //   screen: 'SOURCES',
    //   value: []
    // },
    // {
    //   name: 'Collections',
    //   screen: 'COLLECTIONS',
    //   value: []
    // },
    // {
    //   name: 'Method',
    //   screen: 'METHOD',
    //   value: []
    // }
  ])

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const query = supabaseClient.rpc('query_cocktails', { bar_stock: {}, filter_ingredients: {} })

    filters.forEach((filter) => {
      const values = filter.value.map((item) => item.id)

      switch (filter.name) {
        case 'Base Spirit':
          if (values.length > 0) {
            query.in(
              'base_ingredient_id',
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

  const renderContent = () => {
    if (isFetching) {
      return <Text style={styles.title}>Loading...</Text>
    }

    if (!data || data.length === 0) {
      return <Text style={styles.title}>No data found</Text>
    }

    return data.map((cocktail) => <CocktailCard key={cocktail.id} cocktail={cocktail} />)
  }

  return (
    <View>
      <FiltersBar filters={filters} onApply={handleApply} />
      <ScrollView>
        <Stack.Screen
          options={{
            title: 'COCKTAILS',
            headerTitleAlign: 'center',
          }}
        />
        <PageContainer style={styles.pageContainer}>
          <ErrorAlert message={error?.message} />
          {renderContent()}
        </PageContainer>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: SIZE.marginY,
  },
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium,
    fontWeight: 'bold',
  },
})
