import { useNavigation, NavigationProp } from '@react-navigation/native'
import { useEffect } from 'react'
import { Pressable } from 'react-native'

import SearchIcon from '@/components/_icons/Search'
import ModalBody from '@/components/_overlays/ModalBody'
import IngredientNav from '@/content/IngredientNav'
import { COLORS } from '@/lib/constants'
import { IFilter, FilterNavStackParamList } from '@/lib/types'
import { TIngredient } from '@/lib/types/supabase'

interface IngredientsScreenProps {
  filter?: IFilter
  onChange: (filter: IFilter) => void
}

const IngredientScreen = ({ filter, onChange }: IngredientsScreenProps) => {
  const navigation = useNavigation<NavigationProp<FilterNavStackParamList>>()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate('Search Ingredients')
          }}
          style={{ marginRight: 15, marginBottom: 10 }}
        >
          <SearchIcon color={COLORS.text.link} />
        </Pressable>
      ),
    })
  }, [navigation])

  const checkIfSelected = (ingredient: TIngredient) => {
    if (filter) {
      return filter.value.some((item) => item.id === ingredient.id)
    } else {
      return false
    }
  }

  const handleSelect = (ingredient: TIngredient) => {
    if (!filter) return

    const newFilter = { ...filter, value: [...filter.value] }

    if (newFilter.value.some((item) => item.id === ingredient.id)) {
      newFilter.value = newFilter.value.filter((item) => item.id !== ingredient.id)
    } else {
      newFilter.value.push({ id: ingredient.id, name: ingredient.name })
    }

    onChange(newFilter)
  }

  const handleDeselectAll = () => {
    if (!filter) return

    onChange({ ...filter, value: [] })
  }

  return (
    <ModalBody contentStyle={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>
      <IngredientNav
        checkIfSelected={checkIfSelected}
        onSelect={handleSelect}
        onDeselectAll={handleDeselectAll}
      />
    </ModalBody>
  )
}

IngredientScreen.displayName = 'IngredientScreen'

export default IngredientScreen
