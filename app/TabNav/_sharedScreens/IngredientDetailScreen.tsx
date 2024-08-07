import { useNavigation, NavigationProp, StackActions } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRef } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import AddInput from '@/components/_inputs/AddInput'
import AddToBarModal, { IAddToBarModal } from '@/content/AddToBarModal'
import RelatedCocktails from '@/content/RelatedCocktails'
import { FONTS, COLORS } from '@/lib/constants'
import { useBars } from '@/lib/contexts/BarsContext'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import useIsMounted from '@/lib/hooks/useIsMounted'
import { CocktailsStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<CocktailsStackParamList, 'Ingredient'>

export default function IngredientDetailPage({ route }: Props) {
  const navigation = useNavigation<NavigationProp<CocktailsStackParamList>>()
  const { ingredientsById, error, isFetching, refetch } = useIngredients()

  const addToBarModalRef = useRef<IAddToBarModal | null>(null)
  const checkIfMounted = useIsMounted()
  const ingredientId = route.params?.ingredientId
  const name = route.params?.name
  const barId = route.params?.barId
  const { bars, defaultBar, bar } = useBars(barId)
  const currentBar = bar ? bar : defaultBar

  const ingredient = ingredientsById[ingredientId]
  let isInBar = false

  bars.forEach((barItem) => {
    if (barItem.ingredients_by_id[ingredientId]) {
      isInBar = true
    }
  })

  const renderContent = () => {
    if (isFetching && !checkIfMounted()) {
      return (
        <PageContainer>
          <ActivityIndicator size="small" />
        </PageContainer>
      )
    }

    if (error) {
      return <BodyText>Error: {error.message}</BodyText>
    }

    if (!ingredient) {
      return <BodyText>No data</BodyText>
    }

    return (
      <>
        {ingredient.description && (
          <View style={styles.description}>
            <Text style={styles.descriptionText}>{ingredient.description}</Text>
          </View>
        )}
        <RelatedCocktails
          ingredientId={ingredientId}
          currentBar={currentBar}
          maxToShow={10}
          onViewAllPress={() => {
            navigation.dispatch(
              StackActions.push('Cocktails', {
                ingredient: {
                  id: ingredient.id,
                  name: ingredient.name,
                },
              }),
            )
          }}
        />
      </>
    )
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching && checkIfMounted()}
            onRefresh={refetch}
            tintColor={COLORS.text.body}
          />
        }
      >
        <PageContainer>
          <View style={styles.header}>
            <AddInput
              style={styles.addInput}
              onPress={() => addToBarModalRef.current?.present()}
              checked={isInBar}
            />
            <PageTitleText>{name}</PageTitleText>
          </View>
          {renderContent()}
        </PageContainer>
      </ScrollView>
      <AddToBarModal ref={addToBarModalRef} ingredient={ingredient} />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  addInput: {
    marginRight: 10,
  },
  description: {
    marginBottom: 30,
  },
  descriptionText: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    color: COLORS.text.body,
  },
})
