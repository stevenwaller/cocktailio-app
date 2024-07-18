import { Pressable, Text, StyleSheet } from 'react-native'

import { COLORS, FONTS } from '@/lib/constants'

interface Props {
  onReset: () => void
  resetAll?: boolean
}

const FilterHeaderBtns = ({ onReset, resetAll }: Props) => {
  return (
    <Pressable style={styles.deselect} onPress={onReset}>
      <Text style={styles.deselectText}>Reset{resetAll && ' All'}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  deselect: {
    marginRight: 20,
    marginBottom: 12,
  },
  deselectText: {
    fontSize: 14,
    color: COLORS.text.link,
    fontFamily: FONTS.hells.sans.bold,
  },
})

FilterHeaderBtns.displayName = 'FilterHeaderBtns'

export default FilterHeaderBtns
