import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import AddInput from '@/components/_inputs/AddInput'
import AddToBarModal, { IAddToBarModal } from '@/content/AddToBarModal'
import { FONTS, COLORS } from '@/lib/constants'
import { useBars } from '@/lib/contexts/BarsContext'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { CocktailsStackParamList } from '@/lib/types'

type Props = NativeStackScreenProps<CocktailsStackParamList, 'Ingredient'>

export default function IngredientDetailPage({ route }: Props) {
  const { ingredientsById, error, isFetching } = useIngredients()

  const addToBarModalRef = useRef<IAddToBarModal | null>(null)
  const { bars } = useBars()
  const ingredientId = route.params?.ingredientId
  const name = route.params?.name
  const ingredient = ingredientsById[ingredientId]
  let isInBar = false

  bars.forEach((bar) => {
    if (bar.ingredients_by_id[ingredientId]) {
      isInBar = true
    }
  })

  const renderContent = () => {
    if (isFetching) {
      return <BodyText>Loading...</BodyText>
    }

    if (error) {
      return <BodyText>Error: {error.message}</BodyText>
    }

    if (!ingredient) {
      return <BodyText>No data</BodyText>
    }

    return (
      <>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>Ingredient</Text>
          <Text style={styles.descriptionText}>{ingredient.name}</Text>
        </View>
      </>
    )
  }

  return (
    <>
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
      <AddToBarModal ref={addToBarModalRef} ingredient={ingredient} />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  addInput: {
    marginRight: 10,
  },
  description: {
    marginTop: 10,
  },
  descriptionText: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    color: COLORS.text.body,
  },
})
