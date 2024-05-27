import { useNavigation, NavigationProp } from '@react-navigation/native'
import { StyleSheet, Text, View, Pressable, ViewProps } from 'react-native'

import { BodyText } from './_elements/Text'

import Card from '@/components/Card'
import BookmarkIcon from '@/components/_icons/Bookmark'
import BookmarkSolidIcon from '@/components/_icons/BookmarkSolid'
import { FONTS, COLORS } from '@/lib/constants'
import { CocktailsStackParamList } from '@/lib/types'
import { TCocktail } from '@/lib/types/supabase'

interface CocktailCardProps extends ViewProps {
  cocktail: TCocktail
  onBookmarkPress?: (cocktail: TCocktail) => void
  isBookmarked?: boolean
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

const CocktailCard = ({
  cocktail,
  onBookmarkPress = () => {},
  isBookmarked,
  ...restProps
}: CocktailCardProps) => {
  const navigation = useNavigation<NavigationProp<CocktailsStackParamList>>()
  const { name } = cocktail

  return (
    <Card {...restProps}>
      <Card.Header>
        <Pressable
          onPress={() =>
            navigation.navigate('Cocktail Detail', {
              cocktailId: cocktail.id,
              name,
            })
          }
        >
          <Card.HeaderText isLink>{name}</Card.HeaderText>
        </Pressable>
        <Pressable onPress={() => onBookmarkPress(cocktail)}>
          {isBookmarked ? (
            <BookmarkSolidIcon color={COLORS.text.link} />
          ) : (
            <BookmarkIcon color={COLORS.text.link} />
          )}
        </Pressable>
      </Card.Header>
      <Card.Body>
        {renderIngredients(cocktail)}
        {/* <View style={{ marginTop: 20 }}>
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
        </View> */}
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
