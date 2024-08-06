import { PostgrestError } from '@supabase/supabase-js'
import { useState, useCallback, useEffect } from 'react'
import { ScrollView, View, StyleSheet, Pressable, Text } from 'react-native'

import CocktailCard from '@/components/CocktailCard'
import Skeleton from '@/components/Skeleton'
import { SubTitleText, BodyText } from '@/components/_elements/Text'
import ChevronRightIcon from '@/components/_icons/ChevronRight'
import { SIZE, COLORS, FONTS } from '@/lib/constants'
import { TCocktail, TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface Props {
  label?: string
  cocktailIds?: string[]
  currentBar?: TBar
  ingredientId?: string
  maxToShow?: number
  onViewAllPress?: () => void
}

const RelatedCocktails = ({
  cocktailIds,
  label,
  currentBar,
  ingredientId,
  maxToShow,
  onViewAllPress = () => {},
}: Props) => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [cocktails, setCocktails] = useState<TCocktail[] | null>(null)
  const [count, setCount] = useState(0)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const query = supabaseClient.rpc(
      'query_cocktails',
      {
        bar_id: null,
        collection_id: null,
        search_value: null,
        filter_ingredients: ingredientId ? { [ingredientId]: true } : null,
      },
      { count: 'exact' },
    )

    if (cocktailIds) {
      query.in('id', cocktailIds)
    }

    const response = await query

    setIsFetching(false)
    setCocktails(response.data)
    setCount(response.count ? response.count : 0)
    setError(response.error)
  }, [cocktailIds, ingredientId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const renderViewAll = () => {
    if (!maxToShow) return null

    if (count <= maxToShow) return null

    return (
      <Pressable style={styles.viewAll} onPress={onViewAllPress}>
        <Text style={styles.viewAllText}>View All</Text>
        <ChevronRightIcon color={COLORS.text.link} />
      </Pressable>
    )
  }

  if (isFetching) {
    return (
      <>
        <View style={styles.header}>
          <Skeleton style={{ marginTop: -1, marginBottom: 4 }} width={100} height={18} />
        </View>
        <View style={styles.scrollView}>
          <View style={[styles.scrollViewContainer, { flexDirection: 'row' }]}>
            <Skeleton style={styles.card} width={300} height={113} />
            <Skeleton style={styles.card} width={300} height={113} />
            <Skeleton style={styles.card} width={300} height={113} />
          </View>
        </View>
      </>
    )
  }

  return (
    <>
      <View style={styles.header}>
        <SubTitleText>
          {count} {label ? `${label} ` : ''}Cocktail{count > 1 ? 's' : ''}
        </SubTitleText>
        {renderViewAll()}
      </View>
      {error && <BodyText>Error: {error.message}</BodyText>}
      <ScrollView
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {cocktails &&
          cocktails.map((cocktail, index) => {
            if (maxToShow && index >= maxToShow) return null

            return (
              <CocktailCard
                style={styles.card}
                key={cocktail.id}
                cocktail={cocktail}
                bar={currentBar}
                hideBookmark
              />
            )
          })}
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
  card: {
    width: 300,
    marginRight: 20,
  },
})

RelatedCocktails.displayName = 'RelatedCocktails'

export default RelatedCocktails
