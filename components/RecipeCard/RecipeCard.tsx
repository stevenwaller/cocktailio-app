import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import Card from '@/components/Card'
import { BodyText, BodyLinkText } from '@/components/_elements/Text'
import { FONTS, COLORS } from '@/lib/constants'
import { TCocktail } from '@/lib/types/supabase'

interface RecipeCardProps {
  cocktail: TCocktail
}

const RecipeCard = ({ cocktail, ...restProps }: RecipeCardProps) => {
  const { steps, components, note, sources } = cocktail
  const renderIngredients = () => {
    let returnString = ''

    components.forEach((component, index) => {
      const isLastComponent = index === components.length - 1
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
            <View
              key={step.id}
              style={[styles.step, index === steps.length - 1 && styles.isLastStep]}
            >
              <Text style={styles.stepCount}>{index + 1}.</Text>
              <BodyText style={styles.stepText}>{step.description}</BodyText>
            </View>
          ))}
        </Card.Body>
      </>
    )
  }

  const renderNote = () => {
    if (!note) return null

    return (
      <>
        <Card.Header isBody>
          <Card.HeaderText>Bartender's Note</Card.HeaderText>
        </Card.Header>
        <Card.Body>
          <BodyText>{note}</BodyText>
        </Card.Body>
      </>
    )
  }

  const renderSources = () => {
    if (!sources || sources.length <= 0) return null

    return (
      <>
        <Card.Header isBody>
          <Card.HeaderText>Source{sources.length > 0 && 's'}</Card.HeaderText>
        </Card.Header>
        <Card.Body>
          {sources.map((source, index) => (
            <Link
              key={source.id}
              href={{
                pathname: `/cocktails/sources/${source.source.id}`,
                params: { name: source.source.name }
              }}
            >
              <BodyLinkText>{source.source.name}</BodyLinkText>
            </Link>
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
      {renderNote()}
      {renderSources()}
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
    paddingTop: 4,
    paddingLeft: 20
  }
})

RecipeCard.displayName = 'RecipeCard'

export default RecipeCard
