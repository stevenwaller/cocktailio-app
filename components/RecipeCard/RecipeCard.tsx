import { useNavigation, NavigationProp, StackActions } from '@react-navigation/native'
import { Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native'

import CanMake from '@/components/CanMake'
import Card from '@/components/Card'
import { BodyText, BodyLinkText } from '@/components/_elements/Text'
import { FONTS, COLORS } from '@/lib/constants'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { CocktailsStackParamList } from '@/lib/types'
import { TCocktail, IComponent, TBar } from '@/lib/types/supabase'

interface RecipeCardProps {
  style?: StyleProp<ViewStyle>
  cocktail: TCocktail
  currentBar?: TBar
}

const RecipeCard = ({ cocktail, style, currentBar, ...restProps }: RecipeCardProps) => {
  const navigation = useNavigation<NavigationProp<CocktailsStackParamList>>()
  const { steps, components, optional_components, note, sources } = cocktail
  const { ingredientsById } = useIngredients()
  const sortedComponents = components?.sort((a, b) => {
    if (a.order === null || b.order === null) {
      return 0
    }

    return a.order - b.order
  })
  const sortedOptionalComponents = optional_components?.sort((a, b) => {
    if (a.order === null || b.order === null) {
      return 0
    }

    return a.order - b.order
  })

  const renderIngredientsYouHave = (component: IComponent) => {
    if (!component) return null

    const { ingredients, or_ingredients, recommended_ingredients } = component
    let hasAMatch = false

    ingredients?.forEach((componentIngredient) => {
      if (currentBar?.ingredients_by_id[componentIngredient.ingredient_id]) {
        hasAMatch = true
      }
    })

    or_ingredients?.forEach((componentIngredient) => {
      if (currentBar?.ingredients_by_id[componentIngredient.ingredient_id]) {
        hasAMatch = true
      }
    })

    recommended_ingredients?.forEach((componentIngredient) => {
      if (currentBar?.ingredients_by_id[componentIngredient.ingredient_id]) {
        hasAMatch = true
      }
    })

    if (hasAMatch) return null

    const matchedIngredientIds: string[] = []

    const drillDown = (ingredientIds: string[]) => {
      ingredientIds.forEach((id) => {
        const ingredient = ingredientsById[id]

        if (currentBar?.ingredients_by_id[id]) {
          matchedIngredientIds.push(id)
        }

        if (ingredient.childIngredientIds) {
          drillDown(ingredient.childIngredientIds)
        }
      })
    }

    ingredients?.forEach((componentIngredient) => {
      const ingredient = ingredientsById[componentIngredient.ingredient_id]

      if (ingredient.childIngredientIds) {
        drillDown(ingredient.childIngredientIds)
      }
    })

    if (matchedIngredientIds.length <= 0) return null

    return (
      <View style={styles.ingredientNote}>
        <Text style={styles.ingredientNoteTitle}>YOU HAVE</Text>
        <Text style={styles.ingredientNoteDescription}>
          {matchedIngredientIds.map((id, idIndex) => (
            <Fragment key={id}>
              {idIndex !== 0 && ', '}
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.dispatch(
                    StackActions.push('Ingredient', {
                      ingredientId: id,
                      name: ingredientsById[id].name,
                      barId: currentBar?.id,
                    }),
                  )
                }
              >
                <Text
                  style={[
                    styles.ingredientNoteDescriptionLink,
                    {
                      color: COLORS.text.good,
                    },
                  ]}
                >
                  {ingredientsById[id].name}
                </Text>
              </TouchableWithoutFeedback>
            </Fragment>
          ))}
        </Text>
      </View>
    )
  }

  const renderAmount = (component: IComponent) => {
    const {
      amount,
      amount_numerator,
      amount_denominator,
      amount_max,
      amount_max_numerator,
      amount_max_denominator,
      measurement,
    } = component
    let amountString = ''
    let amountMaxString = ''

    if (amount) {
      amountString = `${amount} `
    }

    if (amount_numerator && amount_denominator) {
      amountString += `${amount_numerator}/${amount_denominator} `
    }

    if (amount_max) {
      amountMaxString = `${amount_max} `
    }

    if (amount_max_numerator && amount_max_denominator) {
      amountMaxString += `${amount_max_numerator}/${amount_max_denominator}`
    }

    if (!amountString && !amountMaxString) return null

    return (
      <View style={styles.pill}>
        <Text style={styles.pillText}>
          {amountString}
          {amountMaxString && ` - ${amountMaxString}`}
          {measurement && ` ${measurement.abbreviation}`}
        </Text>
      </View>
    )
  }

  const renderIngredients = (component: IComponent) => {
    if (!component) return null

    const {
      ingredients,
      or_ingredients,
      recommended_ingredients,
      note: ingredientNote,
      variation,
      substitute,
    } = component

    return (
      <View style={styles.ingredient}>
        <View style={styles.ingredientText}>
          {renderAmount(component)}
          <Text style={styles.ingredientTitle}>
            {ingredients?.map((componentIngredient, index) => {
              const ingredient = ingredientsById[componentIngredient.ingredient_id]
              return (
                <Fragment key={componentIngredient.id}>
                  {index !== 0 && ' or '}
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.dispatch(
                        StackActions.push('Ingredient', {
                          ingredientId: ingredient.id,
                          name: ingredient.name,
                          barId: currentBar?.id,
                        }),
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.ingredientTitleLink,
                        !!currentBar?.ingredients_by_id[ingredient.id] && {
                          color: COLORS.text.good,
                        },
                      ]}
                    >
                      {ingredient.name}
                    </Text>
                  </TouchableWithoutFeedback>
                </Fragment>
              )
            })}
            {or_ingredients?.length > 0 &&
              or_ingredients?.map((componentIngredient, index) => {
                const ingredient = ingredientsById[componentIngredient.ingredient_id]
                return (
                  <Text key={componentIngredient.id} style={styles.orIngredients}>
                    {index === 0 && ' ('}
                    {index !== 0 && ' or '}
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.dispatch(
                          StackActions.push('Ingredient', {
                            ingredientId: ingredient.id,
                            name: ingredient.name,
                            barId: currentBar?.id,
                          }),
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.ingredientTitleLink,
                          !!currentBar?.ingredients_by_id[ingredient.id] && {
                            color: COLORS.text.good,
                          },
                        ]}
                      >
                        {ingredient.name}
                      </Text>
                    </TouchableWithoutFeedback>
                    {index === or_ingredients.length - 1 && ')'}
                  </Text>
                )
              })}
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
                {recommended_ingredients?.map((componentIngredient, index) => {
                  const ingredient = ingredientsById[componentIngredient.ingredient_id]

                  return (
                    <Fragment key={componentIngredient.id}>
                      {index !== 0 && `, `}
                      {recommended_ingredients.length > 1 &&
                        index === recommended_ingredients.length - 1 &&
                        ' or '}
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.dispatch(
                            StackActions.push('Ingredient', {
                              ingredientId: ingredient.id,
                              name: ingredient.name,
                              barId: currentBar?.id,
                            }),
                          )
                        }
                      >
                        <Text
                          style={[
                            styles.ingredientNoteDescriptionLink,
                            !!currentBar?.ingredients_by_id[ingredient.id] && {
                              color: COLORS.text.good,
                            },
                          ]}
                        >
                          {ingredient.name}
                        </Text>
                      </TouchableWithoutFeedback>
                    </Fragment>
                  )
                })}
              </Text>
            </View>
          )}

          {variation && (
            <View style={styles.ingredientNote}>
              <Text style={styles.ingredientNoteTitle}>VARIATION</Text>
              <Text style={styles.ingredientNoteDescription}>{variation}</Text>
            </View>
          )}

          {substitute && (
            <View style={styles.ingredientNote}>
              <Text style={styles.ingredientNoteTitle}>SUBSTITUTE</Text>
              <Text style={styles.ingredientNoteDescription}>{substitute}</Text>
            </View>
          )}

          {renderIngredientsYouHave(component)}
        </View>
      </View>
    )
  }

  const renderComponents = () => {
    if (!sortedComponents || sortedComponents.length <= 0) return null

    return (
      <>
        <Card.Header>
          <Card.HeaderText>Ingredients</Card.HeaderText>
          <CanMake
            cocktail={cocktail ? cocktail : undefined}
            bar={currentBar}
            width={15}
            height={15}
            showCount
          />
        </Card.Header>
        <Card.Body>
          {sortedComponents.map((component, index) => (
            <View
              key={component.id}
              style={[
                styles.component,
                index === sortedComponents.length - 1 && styles.isLastComponent,
              ]}
            >
              {renderIngredients(component)}
            </View>
          ))}
        </Card.Body>
      </>
    )
  }

  const renderOptionalComponents = () => {
    if (!sortedOptionalComponents || sortedOptionalComponents.length <= 0) return null

    return (
      <>
        <Card.Header>
          <Card.HeaderText>Optional Ingredients</Card.HeaderText>
          <CanMake
            cocktail={cocktail ? cocktail : undefined}
            bar={currentBar}
            width={15}
            height={15}
            showCount
            optional
          />
        </Card.Header>
        <Card.Body>
          {sortedOptionalComponents.map((component, index) => (
            <View
              key={component.id}
              style={[
                styles.component,
                index === sortedOptionalComponents.length - 1 && styles.isLastComponent,
              ]}
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
                navigation.navigate('Source', {
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
        {renderOptionalComponents()}
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
