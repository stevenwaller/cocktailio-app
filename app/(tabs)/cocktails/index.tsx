import { PostgrestError } from '@supabase/supabase-js'
import { Stack } from 'expo-router'
import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'

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
      name: 'In Bar Stock',
      screen: 'IN BAR STOCK',
      value: []
    },
    {
      index: 1,
      name: 'Base Spirit',
      screen: 'BASE SPIRIT',
      value: []
    }
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
        `,
        { count: 'exact' }
      )
      .order('name')
      .range(minRange, maxRange)
      .returns<TCocktail[]>()

    setIsFetching(false)
    setData(response.data)
    setError(response.error)
    setCount(response.count)
  }, [minRange, maxRange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleFilterChange = (filter: IFilter) => {
    console.log('filter changed', filter)

    const newFilters = [...filters]
    newFilters[filter.index] = filter

    setFilters(newFilters)
  }

  const renderContent = () => {
    if (isFetching) {
      return <Text style={styles.title}>Loading...</Text>
    }

    if (!data) {
      return <Text style={styles.title}>No data</Text>
    }

    return data.map((cocktail) => <CocktailCard key={cocktail.id} cocktail={cocktail} />)
  }

  return (
    <>
      <FiltersBar filters={filters} onChange={handleFilterChange} />
      <ScrollView>
        <Stack.Screen
          options={{
            title: 'COCKTAILS',
            headerTitleAlign: 'center'
          }}
        />
        <PageContainer style={styles.pageContainer}>
          <ErrorAlert message={error?.message} />
          {renderContent()}
        </PageContainer>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: SIZE.marginY
  },
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium,
    fontWeight: 'bold'
  }
})
