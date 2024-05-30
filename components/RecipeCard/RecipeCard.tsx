import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native'

import Card from '@/components/Card'
import { BodyText, BodyLinkText } from '@/components/_elements/Text'
import { FONTS, COLORS } from '@/lib/constants'
import useBars from '@/lib/hooks/useBars'
import { CocktailsStackParamList } from '@/lib/types'
import { TCocktail, IComponent } from '@/lib/types/supabase'

interface RecipeCardProps {
  style?: StyleProp<ViewStyle>
  cocktail: TCocktail
}

const RecipeCard = ({ cocktail, style, ...restProps }: RecipeCardProps) => {
  const navigation = useNavigation<NavigationProp<CocktailsStackParamList>>()
  const { steps, components, note, sources } = cocktail
  const { bars } = useBars()

  const checkIfInBar = (ingredientId: string) => {
    let isInBar = false

    bars.forEach((bar) => {
      if (bar.ingredientsById[ingredientId]) {
        isInBar = true
      }
    })

    return isInBar
  }

  const renderIngredients = (component: IComponent) => {
    if (!component) return null

    const {
      amount,
      amount_max,
      measurement,
      ingredients,
      or_ingredients,
      recommended_ingredients,
      note: ingredientNote,
      substitute,
    } = component

    return (
      <View style={styles.ingredient}>
        <View style={styles.ingredientText}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>
              {amount}
              {amount_max && ` - ${amount_max}`}
              {measurement && ` ${measurement.abbreviation}`}
            </Text>
          </View>
          <Text style={styles.ingredientTitle}>
            {ingredients?.map((componentIngredient, index) => (
              <Fragment key={componentIngredient.id}>
                {index !== 0 && ' or '}
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('Ingredient', {
                      ingredientId: componentIngredient.ingredient.id,
                      name: componentIngredient.ingredient.name,
                    })
                  }
                >
                  <Text
                    style={[
                      styles.ingredientTitleLink,
                      checkIfInBar(componentIngredient.ingredient.id) && {
                        color: COLORS.text.good,
                      },
                    ]}
                  >
                    {componentIngredient.ingredient.name}
                  </Text>
                </TouchableWithoutFeedback>
              </Fragment>
            ))}
            {or_ingredients?.length > 0 &&
              or_ingredients?.map((componentIngredient, index) => (
                <Text key={componentIngredient.id} style={styles.orIngredients}>
                  {index === 0 && ' ('}
                  {index !== 0 && ' or '}
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate('Ingredient', {
                        ingredientId: componentIngredient.ingredient.id,
                        name: componentIngredient.ingredient.name,
                      })
                    }
                  >
                    <Text style={styles.ingredientTitleLink}>
                      {componentIngredient.ingredient.name}
                    </Text>
                  </TouchableWithoutFeedback>
                  {index === or_ingredients.length - 1 && ')'}
                </Text>
              ))}
          </Text>

          {ingredientNote && (
            <View style={styles.ingredientNote}>
              <Text style={styles.ingredientNoteTitle}>NOTE</Text>
              <Text style={styles.ingredientNoteDescription}>{ingredientNote}</Text>
            </View>
          )}

          {recommended_ingredients?.length > 0 && (
            <View style={styles.ingredientNote}>
              <Text style={styles.ingredientNoteTitle}>RECOMMENDED</Text>
              <Text style={styles.ingredientNoteDescription}>
                {recommended_ingredients?.map((componentIngredient, index) => (
                  <Fragment key={componentIngredient.id}>
                    {index !== 0 && `, `}
                    {recommended_ingredients.length > 1 &&
                      index === recommended_ingredients.length - 1 &&
                      ' or '}
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate('Ingredient', {
                          ingredientId: componentIngredient.ingredient.id,
                          name: componentIngredient.ingredient.name,
                        })
                      }
                    >
                      <Text style={styles.ingredientNoteDescriptionLink}>
                        {componentIngredient.ingredient.name}
                      </Text>
                    </TouchableWithoutFeedback>
                  </Fragment>
                ))}
              </Text>
            </View>
          )}

          {substitute && (
            <View style={styles.ingredientNote}>
              <Text style={styles.ingredientNoteTitle}>SUBSTITUTE</Text>
              <Text style={styles.ingredientNoteDescription}>{substitute}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  const renderComponents = () => {
    if (!components || components.length <= 0) return null

    return (
      <>
        <Card.Header>
          <Card.HeaderText>Ingredients</Card.HeaderText>
        </Card.Header>
        <Card.Body>
          {components.map((component, index) => (
            <View
              key={component.id}
              style={[styles.component, index === components.length - 1 && styles.isLastComponent]}
            >
              {renderIngredients(component)}
            </View>
          ))}
        </Card.Body>
      </>
    )
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
            <TouchableWithoutFeedback
              key={source.id}
              onPress={() =>
                navigation.navigate('Source Detail', {
                  sourceId: source.source.id,
                  name: source.source.name,
                })
              }
            >
              <BodyLinkText>{source.source.name}</BodyLinkText>
            </TouchableWithoutFeedback>
          ))}
        </Card.Body>
      </>
    )
  }

  return (
    <>
      <Card style={style} {...restProps}>
        {renderComponents()}
        {renderSteps()}
        {renderNote()}
        {renderSources()}
      </Card>
    </>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: COLORS.text.link,
    fontFamily: FONTS.schotis.bold,
  },
  component: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomColor: '#153C47',
    borderBottomWidth: 1,
  },
  isLastComponent: {
    paddingBottom: 0,
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  ingredient: {
    flexDirection: 'row',
    gap: 15,
  },
  ingredientText: {},
  pill: {
    borderRadius: 20,
    backgroundColor: COLORS.bg.highlight,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  pillText: {
    fontSize: 14,
    fontFamily: FONTS.hells.sans.bold,
    color: 'white',
  },
  ingredientTitle: {
    fontSize: 20,
    fontFamily: FONTS.hells.sans.bold,
    color: COLORS.text.body,
  },
  ingredientTitleLink: {
    fontSize: 20,
    fontFamily: FONTS.hells.sans.bold,
    color: COLORS.text.link,
  },
  orIngredients: { fontFamily: FONTS.hells.sans.medium, fontSize: 18 },
  ingredientNote: {
    marginTop: 20,
  },
  ingredientNoteTitle: {
    fontSize: 10,
    letterSpacing: 0.4,
    fontFamily: FONTS.hells.sans.bold,
    color: COLORS.text.muted,
    marginBottom: 3,
  },
  ingredientNoteDescription: {
    fontSize: 15,
    fontFamily: FONTS.hells.sans.medium,
    color: COLORS.text.body,
    lineHeight: 18,
  },
  ingredientNoteDescriptionLink: {
    color: COLORS.text.link,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  isLastStep: {
    marginBottom: 0,
  },
  stepCount: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.bold,
  },
  stepText: {
    paddingTop: 4,
    paddingLeft: 20,
  },
})

RecipeCard.displayName = 'RecipeCard'

export default RecipeCard
