import { useNavigation, NavigationProp, StackActions } from '@react-navigation/native'
import { PostgrestError } from '@supabase/supabase-js'
import { useState, useCallback, useEffect } from 'react'
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native'

import CocktailCard from '@/components/CocktailCard'
import { SubTitleText, BodyText } from '@/components/_elements/Text'
import ChevronRightIcon from '@/components/_icons/ChevronRight'
import { SIZE, COLORS, FONTS } from '@/lib/constants'
import { useBars } from '@/lib/contexts/BarsContext'
import { CocktailsStackParamList } from '@/lib/types'
import { TCocktail } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface Props {
  ingredientId: string
  barId?: string
}

const COUNT_TO_SHOW = 10

const CocktailsByIngredient = ({ ingredientId, barId }: Props) => {
  const navigation = useNavigation<NavigationProp<CocktailsStackParamList>>()
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [cocktails, setCocktails] = useState<TCocktail[] | null>(null)
  const [count, setCount] = useState(0)
  const { defaultBar, bar } = useBars(barId)
  const currentBar = bar ? bar : defaultBar

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .rpc(
        'query_cocktails',
        {
          bar_id: null,
          collection_id: null,
          search_value: null,
          filter_ingredients: {
            [ingredientId]: true,
          },
        },
        { count: 'exact' },
      )
      .range(0, COUNT_TO_SHOW)
    // .order(sortColumn, { ascending: isAscending })

    setIsFetching(false)
    setCocktails(response.data)
    setCount(response.count ? response.count : 0)
    setError(response.error)
  }, [ingredientId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <View style={styles.header}>
        <SubTitleText>{isFetching ? '' : count} Cocktails</SubTitleText>
        {count > COUNT_TO_SHOW && (
          <Pressable
            style={styles.viewAll}
            onPress={() => {
              console.log('onpress')

              navigation.dispatch(
                StackActions.push('Cocktails', {
                  ingredientId,
                }),
              )
            }}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRightIcon color={COLORS.text.link} />
          </Pressable>
        )}
      </View>
      {isFetching && <BodyText>Loading...</BodyText>}
      {error && <BodyText>Error: {error.message}</BodyText>}
      <ScrollView
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {cocktails &&
          cocktails.map((cocktail) => (
            <CocktailCard
              style={{ width: 300, marginRight: 20 }}
              key={cocktail.id}
              cocktail={cocktail}
              bar={currentBar}
              hideBookmark
            />
          ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllText: {
    color: COLORS.text.link,
    fontFamily: FONTS.hells.sans.bold,
    fontSize: 16,
  },
  scrollView: {
    zIndex: 1,
    marginLeft: -SIZE.app.paddingX,
    marginRight: 2 * -SIZE.app.paddingX,
    marginTop: -20,
  },
  scrollViewContainer: {
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: SIZE.app.paddingX,
  },
})

CocktailsByIngredient.displayName = 'CocktailsByIngredient'

export default CocktailsByIngredient
