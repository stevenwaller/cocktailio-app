import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { PostgrestError } from '@supabase/supabase-js'
import { Stack } from 'expo-router'
import { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, ScrollView, Text, View, Pressable } from 'react-native'

import CocktailCard from '@/components/CocktailCard'
import ErrorAlert from '@/components/ErrorAlert'
import PageContainer from '@/components/PageContainer'
import FilterIcon from '@/components/_icons/Filter'
import FilterBottomSheetModal from '@/components/_overlays/FilterBottomSheetModal'
import { COLORS, FONTS, SIZE } from '@/lib/constants'
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
  const sheetRef = useRef<BottomSheetModal>(null)

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

    console.log('response', response)

    setIsFetching(false)
    setData(response.data)
    setError(response.error)
    setCount(response.count)
  }, [minRange, maxRange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const renderContent = () => {
    if (isFetching) {
      return <Text style={styles.title}>Loading...</Text>
    }

    if (!data) {
      return <Text style={styles.title}>No data</Text>
    }

    return (
      <>
        <View style={styles.filters}>
          <Pressable onPress={() => sheetRef.current?.present()}>
            <FilterIcon color={COLORS.text.link} />
          </Pressable>
        </View>
        {data.map((cocktail) => (
          <CocktailCard key={cocktail.id} cocktail={cocktail} />
        ))}
      </>
    )
  }

  return (
    <>
      <ScrollView>
        <Stack.Screen
          options={{
            title: 'COCKTAILS',
            headerTitleAlign: 'center'
          }}
        />
        <PageContainer>
          <ErrorAlert message={error?.message} />
          {renderContent()}
        </PageContainer>
      </ScrollView>
      <FilterBottomSheetModal ref={sheetRef} />
    </>
  )
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    marginBottom: SIZE.app.paddingY
  },
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium,
    fontWeight: 'bold'
  }
})
