import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Pressable } from 'react-native'

import BarStockIcon from '@/components/_icons/BarStock'
import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'

interface Props {
  showBarStock?: boolean
  onBarStockPress?: () => void
  onSortPress?: () => void
  onSearchPress?: () => void
}

const CocktailsHeaderBtns = ({
  onSearchPress,
  onBarStockPress,
  onSortPress,
  showBarStock,
}: Props) => {
  return (
    <>
      {showBarStock && (
        <Pressable onPress={onBarStockPress} style={{ marginRight: 15 }}>
          <BarStockIcon color={COLORS.nav.text} />
        </Pressable>
      )}
      <Pressable onPress={onSortPress} style={{ marginRight: 15 }}>
        <MaterialCommunityIcons name="sort-calendar-ascending" size={27} color={COLORS.nav.text} />
      </Pressable>
      <Pressable onPress={onSearchPress}>
        <SearchIcon color={COLORS.nav.text} />
      </Pressable>
    </>
  )
}

CocktailsHeaderBtns.displayName = 'CocktailsHeaderBtns'

export default CocktailsHeaderBtns
