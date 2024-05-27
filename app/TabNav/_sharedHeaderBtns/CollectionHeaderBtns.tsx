import { Pressable } from 'react-native'

import MoreIcon from '@/components/_icons/More'
import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'

interface CollectionHeaderBtnsProps {
  onSearchPress?: () => void
  onMorePress?: () => void
}

const CollectionHeaderBtns = ({ onSearchPress, onMorePress }: CollectionHeaderBtnsProps) => {
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

CollectionHeaderBtns.displayName = 'CollectionHeaderBtns'

export default CollectionHeaderBtns
