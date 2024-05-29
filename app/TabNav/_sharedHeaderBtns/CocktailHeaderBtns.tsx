import { Pressable } from 'react-native'

import BookmarkIcon from '@/components/_icons/Bookmark'
import BookmarkSolidIcon from '@/components/_icons/BookmarkSolid'
import { COLORS } from '@/lib/constants'

interface BarHeaderBtnsProps {
  isBookmarked?: boolean
  onBookmarkPress?: () => void
}

const BarHeaderBtns = ({ onBookmarkPress, isBookmarked }: BarHeaderBtnsProps) => {
  return (
    <>
      <Pressable onPress={onBookmarkPress}>
        {isBookmarked ? (
          <BookmarkSolidIcon color={COLORS.nav.text} />
        ) : (
          <BookmarkIcon color={COLORS.nav.text} />
        )}
      </Pressable>
    </>
  )
}

BarHeaderBtns.displayName = 'BarHeaderBtns'

export default BarHeaderBtns
