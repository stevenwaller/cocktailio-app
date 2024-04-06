import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import { FONTS, COLORS, SIZE } from '@/lib/constants'
import { TCocktail } from '@/lib/types/supabase'

interface CocktailCardProps {
  cocktail: TCocktail
}

const renderIngredients = (cocktail: TCocktail) => {
  let returnString = ''

  cocktail.components.forEach((component, index) => {
    const isLastComponent = index === cocktail.components.length - 1
    component.ingredients.forEach((ingredient) => {
      returnString += ingredient.ingredient.name

      if (!isLastComponent) returnString += ' • '
    })
  })

  return <Text style={styles.ingredients}>{returnString}</Text>
}

const CocktailCard = ({ cocktail, ...restProps }: CocktailCardProps) => {
  const { name } = cocktail

  return (
    <View style={styles.card} {...restProps}>
      <View style={styles.header}>
        <Link style={styles.name} href={`/cocktails/${cocktail.name}`}>
          {name}
        </Link>
      </View>
      <View style={styles.body}>{renderIngredients(cocktail)}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    // paddingTop: 17,
    // paddingRight: 20,
    // paddingLeft: 20,
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
  header: {
    display: 'flex',
    width: '100%',
    borderTopStartRadius: SIZE.border.radius,
    borderTopEndRadius: SIZE.border.radius,
    backgroundColor: COLORS.bg.level2
  },
  name: {
    paddingTop: 8,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    fontSize: 20,
    color: COLORS.text.link,
    fontFamily: FONTS.schotis.bold
  },
  body: {
    display: 'flex',
    width: '100%',
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20
  },
  ingredients: {
    fontSize: 14,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium
  }
})

CocktailCard.displayName = 'CocktailCard'

export default CocktailCard
