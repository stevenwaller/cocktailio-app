import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Text, StyleSheet, View } from 'react-native'

import AddInput from '@/components/_inputs/AddInput'
import { COLORS, FONTS } from '@/lib/constants'
import useSupabase from '@/lib/hooks/useSupabase'
import { IFilter } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'

interface BaseSpiritScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const BaseSpiritScreen = ({ filter, onChange }: BaseSpiritScreenProps) => {
  const { data, error, isFetching } = useSupabase<TIngredient>({
    tableName: 'ingredients',
    args: [{ operator: 'eq', key: 'is_base', value: true }]
  })

  const handleIngredientPress = (ingredient: TIngredient) => {
    if (!filter) return

    const newFilter = { ...filter }

    if (newFilter.value.includes(ingredient.id)) {
      newFilter.value = newFilter.value.filter((id) => id !== ingredient.id)
    } else {
      newFilter.value.push(ingredient.id)
    }

    onChange(newFilter)
  }

  if (isFetching) return <Text>Loading...</Text>

  if (error) return <Text>Error: {error.message}</Text>

  if (!data) return <Text>No data</Text>

  return (
    <BottomSheetScrollView style={styles.container}>
      {data.map((ingredient) => (
        <View key={ingredient.id} style={styles.ingredient}>
          <AddInput
            checked={filter?.value.includes(ingredient.id)}
            onPress={() => handleIngredientPress(ingredient)}
          />
          <Text style={styles.ingredientText}>{ingredient.name}</Text>
        </View>
      ))}
    </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg.level3,
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 20
  },
  ingredient: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15
  },
  ingredientText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 2
  }
})

BaseSpiritScreen.displayName = 'BaseSpiritScreen'

export default BaseSpiritScreen
