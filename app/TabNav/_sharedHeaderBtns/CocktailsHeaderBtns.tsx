import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Pressable } from 'react-native'

import BarStockIcon from '@/components/_icons/BarStock'
import MoreIcon from '@/components/_icons/More'
import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'
import { SortableColumns } from '@/lib/types'

interface Props {
  isAscending?: boolean
  sortColumn?: SortableColumns
  showBarStock?: boolean
  onBarStockPress?: () => void
  onSortPress?: () => void
  onSearchPress?: () => void
  onMorePress?: () => void
}

const CocktailsHeaderBtns = ({
  isAscending,
  sortColumn,
  onSearchPress,
  onBarStockPress,
  onSortPress,
  showBarStock,
  onMorePress,
}: Props) => {
  const iconName = () => {
    if (sortColumn === 'created_at') {
      return isAscending ? 'sort-calendar-ascending' : 'sort-calendar-descending'
    } else if (sortColumn === 'name') {
      return isAscending ? 'sort-alphabetical-ascending' : 'sort-alphabetical-descending'
    }
  }

  return (
    <>
      {showBarStock && (
        <Pressable onPress={onBarStockPress} style={{ marginLeft: 15 }}>
          <BarStockIcon color={COLORS.nav.text} />
        </Pressable>
      )}
      <Pressable onPress={onSortPress} style={{ marginLeft: 15 }}>
        <MaterialCommunityIcons name={iconName()} size={27} color={COLORS.nav.text} />
      </Pressable>
      <Pressable onPress={onSearchPress} style={{ marginLeft: 15 }}>
        <SearchIcon color={COLORS.nav.text} />
      </Pressable>
      {onMorePress && (
        <Pressable onPress={onMorePress} style={{ marginLeft: 15 }}>
          <MoreIcon color={COLORS.nav.text} />
        </Pressable>
      )}
    </>
  )
}

CocktailsHeaderBtns.displayName = 'CocktailsHeaderBtns'

export default CocktailsHeaderBtns
