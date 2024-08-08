import { PostgrestError } from '@supabase/supabase-js'
import { ScrollView, View, StyleSheet, Pressable, Text } from 'react-native'

import CocktailCard from '@/components/CocktailCard'
import { SubTitleText, BodyText } from '@/components/_elements/Text'
import ChevronRightIcon from '@/components/_icons/ChevronRight'
import Skeleton from '@/components/_loaders/Skeleton'
import { SIZE, COLORS, FONTS } from '@/lib/constants'
import { TCocktail, TBar } from '@/lib/types/supabase'

interface Props {
  label?: string
  currentBar?: TBar
  maxToShow?: number
  onViewAllPress?: () => void
  isFetching?: boolean
  error?: PostgrestError | null
  cocktails?: TCocktail[] | null
}

export default function RelatedCocktails({
  label,
  currentBar,
  maxToShow,
  onViewAllPress = () => {},
  isFetching,
  error,
  cocktails,
}: Props) {
  const isMoreThanOne = cocktails ? cocktails.length > 1 : false

  const renderViewAll = () => {
    if (!maxToShow) return null

    if (cocktails && cocktails?.length <= maxToShow) return null

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
        <SubTitleText>{label}</SubTitleText>
        {renderViewAll()}
      </View>
      {error && <BodyText>Error: {error.message}</BodyText>}
      <ScrollView
        horizontal={isMoreThanOne}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        scrollEnabled={isMoreThanOne}
      >
        {cocktails &&
          cocktails.map((cocktail, index) => {
            if (maxToShow && index >= maxToShow) return null

            return (
              <CocktailCard
                style={isMoreThanOne ? styles.card : { marginRight: SIZE.app.paddingX }}
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
