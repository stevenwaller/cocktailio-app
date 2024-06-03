import { useHeaderHeight } from '@react-navigation/elements'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState, useEffect, useCallback } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'

import BarIngredientsHeaderBtns from '../_sharedHeaderBtns/BarIngredientsHeaderBtns'

import PageContainer from '@/components/PageContainer'
import SearchInput from '@/components/SearchInput'
import IngredientList from '@/content/IngredientList'
import useBars from '@/lib/hooks/useBars'
import { BarStockStackParamList } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'
import uuid from '@/lib/utils/uuid'

type Props = NativeStackScreenProps<BarStockStackParamList, 'Bar Ingredients'>

export default function BarIngredients({ route, navigation }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const barId = route.params.barId
  const { bar, setBar } = useBars(barId as string)
  const headerHeight = useHeaderHeight()

  const clearAll = useCallback(async () => {}, [bar, setBar])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <BarIngredientsHeaderBtns onDeselectPress={clearAll} />,
    })
  }, [navigation, clearAll])

  if (!bar) return null

  const checkIfSelected = (ingredient: TIngredient) => !!bar.ingredientsById[ingredient.id]

  const handleSelect = async (ingredient: TIngredient) => {
    const alreadySelected = !!bar.ingredientsById[ingredient.id]

    const newBar = {
      ...bar,
      ingredientsById: { ...bar.ingredientsById },
      bar_ingredients: [...bar.bar_ingredients],
    }

    const newBarVariables = {
      id: uuid(),
      created_at: new Date().toISOString(),
      bar_id: bar.id,
      ingredient_id: ingredient.id,
    }

    if (alreadySelected) {
      delete newBar.ingredientsById[ingredient.id]
      newBar.bar_ingredients = newBar.bar_ingredients.filter(
        (bar_ingredient) => bar_ingredient.ingredient_id !== ingredient.id,
      )
    } else {
      newBar.ingredientsById[ingredient.id] = ingredient
      newBar.bar_ingredients.push({ ...newBarVariables, ingredient })
    }

    setBar(newBar)

    if (alreadySelected) {
      await supabaseClient.from('bar_ingredients').delete().eq('ingredient_id', ingredient.id)
    } else {
      await supabaseClient.from('bar_ingredients').insert(newBarVariables).select().single()
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          onClear={() => setSearchValue('')}
          placeholder="Search by ingredient name"
        />
        <ScrollView>
          <PageContainer style={{ paddingTop: 5 }}>
            <IngredientList
              onSelect={handleSelect}
              checkIfSelected={checkIfSelected}
              searchValue={searchValue}
            />
          </PageContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}
