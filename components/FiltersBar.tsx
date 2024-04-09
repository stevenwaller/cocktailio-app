import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { StyleSheet, ScrollView, View, Pressable } from 'react-native'

import ChevronDown from '@/components/_icons/ChevronDown'
import FilterIcon from '@/components/_icons/Filter'
import Button from '@/components/_inputs/Button'
import FiltersModal from '@/components/_overlays/FiltersModal'
import { COLORS, FONTS, SIZE } from '@/lib/constants'

interface FiltersBarProps {}

const FiltersBar = ({}: FiltersBarProps) => {
  const sheetRef = useRef<BottomSheetModal>(null)

  return (
    <>
      <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          <Pressable style={styles.iconBtn} onPress={() => sheetRef.current?.present('FILTERS')}>
            <FilterIcon color={COLORS.text.action} />
          </Pressable>
          <Button
            label="In Stock"
            onPress={() => sheetRef.current?.present('IN STOCK')}
            slotRight={<ChevronDown color={COLORS.text.dark} />}
          />
        </View>
      </ScrollView>
      <FiltersModal ref={sheetRef} />
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.bg.level2,
    height: 56,
    paddingHorizontal: SIZE.app.paddingX
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBtn: {
    marginRight: 15
  },
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium,
    fontWeight: 'bold'
  }
})

FiltersBar.displayName = 'FiltersBar'

export default FiltersBar
