import { Link } from 'expo-router'
import { Fragment } from 'react'
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native'

import Card from '@/components/Card'
import { BodyText, BodyLinkText } from '@/components/_elements/Text'
import AddInput from '@/components/_inputs/AddInput'
import { FONTS, COLORS } from '@/lib/constants'
import { TCocktail, IComponent } from '@/lib/types/supabase'

interface RecipeCardProps {
  style?: StyleProp<ViewStyle>
  cocktail: TCocktail
}

const RecipeCard = ({ cocktail, style, ...restProps }: RecipeCardProps) => {
  const { steps, components, note, sources } = cocktail

  const renderIngredients = (component: IComponent) => {
    if (!component) return null

    const {
      amount,
      amount_max,
      measurement,
      ingredients,
      or_ingredients,
      pref_ingredients,
      note,
      substitute,
    } = component

    return (
      <View style={styles.ingredient}>
        <View style={styles.ingredientAction}>
          <AddInput />
        </View>
        <View style={styles.ingredientText}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>
              {amount}
              {amount_max && ` - ${amount_max}`}
              {measurement && ` ${measurement.abbreviation}`}
            </Text>
          </View>
          <Text style={styles.ingredientTitle}>
            {ingredients?.map((ingredient, index) => (
              <Fragment key={ingredient.id}>
                {index !== 0 && ' or '}
                <Link
                  style={styles.ingredientTitleLink}
                  href={{
                    pathname: `/cocktails/ingredients/${ingredient.ingredient.id}`,
                    params: { name: ingredient.ingredient.name },
                  }}
                >
                  {ingredient.ingredient.name}
                </Link>
              </Fragment>
            ))}
            {or_ingredients?.length > 0 &&
              or_ingredients?.map((ingredient, index) => (
                <Text key={ingredient.id} style={styles.orIngredients}>
                  {index === 0 && ' ('}
                  {index !== 0 && ' or '}
                  <Link
                    style={styles.ingredientTitleLink}
                    href={{
                      pathname: `/cocktails/ingredients/${ingredient.ingredient.id}`,
                      params: { name: ingredient.ingredient.name },
                    }}
                  >
                    {ingredient.ingredient.name}
                  </Link>
                  {index === or_ingredients.length - 1 && ')'}
                </Text>
              ))}
          </Text>

          {note && (
            <View style={styles.ingredientNote}>
              <Text style={styles.ingredientNoteTitle}>NOTE</Text>
              <Text style={styles.ingredientNoteDescription}>{note}</Text>
            </View>
          )}

          {pref_ingredients?.length > 0 && (
            <View style={styles.ingredientNote}>
              <Text style={styles.ingredientNoteTitle}>RECOMMENDED</Text>
              <Text style={styles.ingredientNoteDescription}>
                {pref_ingredients?.map((ingredient, index) => (
                  <Fragment key={ingredient.id}>
                    {index !== 0 && `, `}
                    {pref_ingredients.length > 1 && index === pref_ingredients.length - 1 && ' or '}
                    <Link
                      style={styles.ingredientTitleLink}
                      href={{
                        pathname: `/cocktails/ingredients/${ingredient.ingredient.id}`,
                        params: { name: ingredient.ingredient.name },
                      }}
                    >
                      {ingredient.ingredient.name}
                    </Link>
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
            <Link
              key={source.id}
              href={{
                pathname: `/cocktails/sources/${source.source.id}`,
                params: { name: source.source.name },
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
    <Card style={style} {...restProps}>
      {renderComponents()}
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
  ingredientAction: {},
  ingredientText: {
    flex: 1,
    paddingTop: 2,
  },
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
