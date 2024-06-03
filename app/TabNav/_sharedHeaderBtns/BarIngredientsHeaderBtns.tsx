import { Pressable, Text } from 'react-native'

import { FONTS, COLORS } from '@/lib/constants'

interface Props {
  onDeselectPress?: () => void
}

const BarIngredientsHeaderBtns = ({ onDeselectPress }: Props) => {
  return (
    <>
      <Pressable onPress={onDeselectPress}>
        <Text style={{ fontFamily: FONTS.hells.sans.medium, color: COLORS.nav.text }}>
          Deselect All
        </Text>
      </Pressable>
    </>
  )
}

BarIngredientsHeaderBtns.displayName = 'BarIngredientsHeaderBtns'

export default BarIngredientsHeaderBtns
