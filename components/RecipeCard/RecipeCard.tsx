import { StyleSheet, Text, View } from 'react-native'

import Card from '@/components/Card'
import { FONTS, COLORS } from '@/lib/constants'
import { TCocktail } from '@/lib/types/supabase'

interface RecipeCardProps {
  cocktail: TCocktail
}

const RecipeCard = ({ cocktail, ...restProps }: RecipeCardProps) => {
  const { steps } = cocktail
  const renderIngredients = () => {
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

  const renderSteps = () => {
    if (!steps || steps.length <= 0) return null

    return (
      <>
        <Card.Header isBody>
          <Card.HeaderText>Preparation</Card.HeaderText>
        </Card.Header>
        <Card.Body>
          {steps.map((step, index) => (
            <View style={[styles.step, index === steps.length - 1 && styles.isLastStep]}>
              <Text style={styles.stepCount}>{index + 1}.</Text>
              <Text style={styles.stepText}>{step.description}</Text>
            </View>
          ))}
        </Card.Body>
      </>
    )
  }

  return (
    <Card {...restProps}>
      <Card.Header>
        <Card.HeaderText>Ingredients</Card.HeaderText>
      </Card.Header>
      <Card.Body>{renderIngredients()}</Card.Body>
      {renderSteps()}
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
  },
  step: {
    flexDirection: 'row',
    marginBottom: 20
  },
  isLastStep: {
    marginBottom: 0
  },
  stepCount: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.bold
  },
  stepText: {
    fontSize: 16,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    paddingTop: 4,
    paddingLeft: 20
  }
})

RecipeCard.displayName = 'RecipeCard'

export default RecipeCard
