import { Pressable } from 'react-native'

import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'

interface Props {
  onSearchPress?: () => void
}

const BarIngredientsHeaderBtns = ({ onSearchPress = () => {} }: Props) => {
  return (
    <>
      <Pressable onPress={onSearchPress} style={{ marginLeft: 15 }}>
        <SearchIcon color={COLORS.nav.text} />
      </Pressable>
    </>
  )
}

BarIngredientsHeaderBtns.displayName = 'BarIngredientsHeaderBtns'

export default BarIngredientsHeaderBtns
