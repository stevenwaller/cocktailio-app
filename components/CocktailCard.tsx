import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import { BodyText } from './_elements/Text'

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
            pathname: `./${cocktail.id}`,
            params: { name: cocktail.name },
          }}
          asChild
        >
          <Card.HeaderText isLink>{name}</Card.HeaderText>
        </Link>
      </Card.Header>
      <Card.Body>
        {renderIngredients(cocktail)}
        <View style={{ marginTop: 20 }}>
          <BodyText style={{ marginBottom: 5 }}>SOURCES:</BodyText>
          {cocktail.sources?.map((source) => (
            <Text key={source.id} style={styles.ingredients}>
              {source.source.name}
            </Text>
          ))}
        </View>
        <View style={{ marginTop: 20 }}>
          <BodyText style={{ marginBottom: 5 }}>METHOD:</BodyText>
          <BodyText>{cocktail.method?.name}</BodyText>
        </View>
        <View style={{ marginTop: 20 }}>
          <BodyText style={{ marginBottom: 5 }}>ERA:</BodyText>
          <BodyText>{cocktail.era?.name}</BodyText>
        </View>
        <View style={{ marginTop: 20 }}>
          <BodyText style={{ marginBottom: 5 }}>GLASSWARE:</BodyText>
          <BodyText>{cocktail.glass?.name}</BodyText>
        </View>
      </Card.Body>
    </Card>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: COLORS.text.link,
    fontFamily: FONTS.schotis.bold,
  },
  ingredients: {
    fontSize: 14,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
  },
})

CocktailCard.displayName = 'CocktailCard'

export default CocktailCard
