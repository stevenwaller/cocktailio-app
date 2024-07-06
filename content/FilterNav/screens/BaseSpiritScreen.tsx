import { Text, StyleSheet, View } from 'react-native'

import { BodyText } from '@/components/_elements/Text'
import AddInput from '@/components/_inputs/AddInput'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { IFilter } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'

interface BaseSpiritScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const BaseSpiritScreen = ({ filter, onChange }: BaseSpiritScreenProps) => {
  const { baseSpiritIds, ingredientsById, isFetching, error } = useIngredients()

  const handleIngredientPress = (ingredient: TIngredient) => {
    if (!filter) return

    const newFilter = { ...filter, value: [...filter.value] }

    if (newFilter.value.some((item) => item.id === ingredient.id)) {
      newFilter.value = newFilter.value.filter((item) => item.id !== ingredient.id)
    } else {
      newFilter.value.push({ id: ingredient.id, name: ingredient.name })
    }

    onChange(newFilter)
  }

  if (isFetching) return <BodyText>Loading...</BodyText>

  if (error) return <BodyText>Error: {error.message}</BodyText>

  if (baseSpiritIds.length <= 0) return <BodyText>No data</BodyText>

  return (
    <ModalBody>
      {baseSpiritIds.map((ingredientId) => {
        const ingredient = ingredientsById[ingredientId]

        return (
          <View key={ingredient.id} style={styles.ingredient}>
            <AddInput
              checked={filter?.value.some((item) => item.id === ingredient.id)}
              onPress={() => handleIngredientPress(ingredient)}
            />
            <Text style={styles.ingredientText}>{ingredient.name}</Text>
          </View>
        )
      })}
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  ingredient: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  ingredientText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 2,
  },
})

BaseSpiritScreen.displayName = 'BaseSpiritScreen'

export default BaseSpiritScreen
