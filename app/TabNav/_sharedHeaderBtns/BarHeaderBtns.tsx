import { Pressable } from 'react-native'

import MoreIcon from '@/components/_icons/More'
import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'

interface Props {
  onSearchPress?: () => void
  onMorePress?: () => void
}

const BarHeaderBtns = ({ onSearchPress, onMorePress }: Props) => {
  return (
    <>
      <Pressable style={{ marginRight: 15 }} onPress={onSearchPress}>
        <SearchIcon color={COLORS.nav.text} />
      </Pressable>
      <Pressable onPress={onMorePress}>
        <MoreIcon color={COLORS.nav.text} />
      </Pressable>
    </>
  )
}

BarHeaderBtns.displayName = 'BarHeaderBtns'

export default BarHeaderBtns
