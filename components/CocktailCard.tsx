import { Link } from 'expo-router'
import { StyleSheet, Text } from 'react-native'

import Card from '@/components/Card'
import { FONTS, COLORS } from '@/lib/constants'
import { TCocktail } from '@/lib/types/supabase'

interface CocktailCardProps {
  cocktail: TCocktail
}

const renderIngredients = (cocktail: TCocktail) => {
  let returnString = ''

  if (!cocktail.components) return null

  cocktail.components.forEach((component, index) => {
    if (!cocktail.components) return null

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
    <Card {...restProps}>
      <Card.Header>
        <Link
          style={styles.name}
          href={{
            pathname: `/cocktails/${cocktail.id}`,
            params: { name: cocktail.name }
          }}
          asChild
        >
          <Card.HeaderText isLink>{name}</Card.HeaderText>
        </Link>
      </Card.Header>
      <Card.Body>{renderIngredients(cocktail)}</Card.Body>
    </Card>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: COLORS.text.link,
    fontFamily: FONTS.schotis.bold
  },
  ingredients: {
    fontSize: 14,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium
  }
})

CocktailCard.displayName = 'CocktailCard'

export default CocktailCard
