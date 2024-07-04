import { useHeaderHeight } from '@react-navigation/elements'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState, useEffect, useCallback } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'

import BarIngredientsHeaderBtns from '../_sharedHeaderBtns/BarIngredientsHeaderBtns'

import PageContainer from '@/components/PageContainer'
import SearchInput from '@/components/SearchInput'
import IngredientList from '@/content/IngredientList'
import { useBars } from '@/lib/contexts/BarsContext'
import { BarStockStackParamList } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'
import updateBarStock from '@/lib/utils/updateBarStock'

type Props = NativeStackScreenProps<BarStockStackParamList, 'Bar Ingredients'>

export default function BarIngredients({ route, navigation }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const barId = route.params.barId
  const { bar, setBar } = useBars(barId as string)
  const headerHeight = useHeaderHeight()

  const clearAll = useCallback(async () => {}, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <BarIngredientsHeaderBtns onDeselectPress={clearAll} />,
    })
  }, [navigation, clearAll])

  if (!bar) return null

  const checkIfSelected = (ingredient: TIngredient) => {
    return !!bar.ingredients_by_id[ingredient.id]
  }

  const handleSelect = async (ingredient: TIngredient) => {
    updateBarStock({
      bar,
      ingredient,
      setBar,
      onError: () => {
        // TODO: show error in toast
      },
    })
  }

  return (
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
  )
}
