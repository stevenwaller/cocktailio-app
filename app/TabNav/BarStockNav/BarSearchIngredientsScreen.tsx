import { useHeaderHeight } from '@react-navigation/elements'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native'

import SearchInput from '@/components/SearchInput'
import IngredientSearchResults from '@/content/IngredientSearchResults'
import { COLORS, SEARCH_HEIGHT } from '@/lib/constants'
import { useBars } from '@/lib/contexts/BarsContext'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { BarStockStackParamList } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'
import updateBarStock from '@/lib/utils/updateBarStock'

type Props = NativeStackScreenProps<BarStockStackParamList, 'Search Ingredients'>

export default function BarSearchIngredientsScreen({ route }: Props) {
  const headerHeight = useHeaderHeight()
  const barId = route.params?.barId
  const { bar, setBar } = useBars(barId as string)
  const { ingredientsById } = useIngredients()
  const [searchValue, setSearchValue] = useState('')

  if (!bar) return null

  const checkIfSelected = (ingredient: TIngredient) => {
    return !!bar.ingredients_by_id[ingredient.id]
  }

  const handleSelect = async (ingredient: TIngredient) => {
    updateBarStock({
      bar,
      ingredient,
      ingredientsById,
      setBar,
      onError: () => {
        // TODO: show error in toast
      },
    })
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
          autoFocus
          placeholder="Search ingredients by name"
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 1,
            width: '100%',
          }}
          inputStyle={{ backgroundColor: COLORS.bg.level2 }}
        />
        <SafeAreaView style={{ marginTop: SEARCH_HEIGHT }}>
          <ScrollView>
            <IngredientSearchResults
              checkIfSelected={checkIfSelected}
              onSelect={handleSelect}
              searchValue={searchValue}
            />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  )
}
