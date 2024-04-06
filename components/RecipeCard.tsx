import { Link } from 'expo-router'
import { StyleSheet, Text } from 'react-native'

import Card from '@/components/Card'
import { FONTS, COLORS } from '@/lib/constants'
import { TCocktail } from '@/lib/types/supabase'

interface RecipeCardProps {
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

const RecipeCard = ({ cocktail, ...restProps }: RecipeCardProps) => {
  return (
    <Card {...restProps}>
      <Card.Header>
        <Card.HeaderText>Ingredients</Card.HeaderText>
      </Card.Header>
      <Card.Body>{renderIngredients(cocktail)}</Card.Body>
      <Card.Header isBody>
        <Card.HeaderText>Preparation</Card.HeaderText>
      </Card.Header>
      <Card.Body>
        <Text>Steps to here</Text>
      </Card.Body>
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

RecipeCard.displayName = 'RecipeCard'

export default RecipeCard
