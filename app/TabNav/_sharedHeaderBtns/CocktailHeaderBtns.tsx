import { Pressable } from 'react-native'

import BookmarkIcon from '@/components/_icons/Bookmark'
import BookmarkSolidIcon from '@/components/_icons/BookmarkSolid'
import { COLORS } from '@/lib/constants'

interface Props {
  isBookmarked?: boolean
  onBookmarkPress?: () => void
}

const CocktailHeaderBtns = ({ onBookmarkPress, isBookmarked }: Props) => {
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

CocktailHeaderBtns.displayName = 'CocktailHeaderBtns'

export default CocktailHeaderBtns
