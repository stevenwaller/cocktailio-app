import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import { FONTS, COLORS, SIZE } from '@/lib/constants'
import { TCocktails } from '@/lib/types/supabase'

interface CocktailCardProps {
  cocktail: TCocktails
}

const CocktailCard = ({ cocktail, ...restProps }: CocktailCardProps) => {
  const { name, description } = cocktail

  return (
    <View style={styles.card} {...restProps}>
      <Link href={`/cocktails/${cocktail.name}`}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingTop: 17,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
    backgroundColor: COLORS.bg.level3,
    borderRadius: SIZE.border.radius,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 40
  },
  textContainer: {
    paddingBottom: 17
  },
  name: {
    display: 'flex',
    fontSize: 26,
    color: COLORS.text.body,
    fontFamily: FONTS.schotis.bold
  },
  description: {
    display: 'flex',
    fontSize: 13,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium
  }
})

CocktailCard.displayName = 'CocktailCard'

export default CocktailCard
