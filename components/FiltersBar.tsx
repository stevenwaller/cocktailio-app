import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { StyleSheet, ScrollView, Text, View, Pressable } from 'react-native'

import FilterIcon from '@/components/_icons/Filter'
import FiltersModal from '@/components/_overlays/FiltersModal'
import { COLORS, FONTS, SIZE } from '@/lib/constants'

interface FiltersBarProps {}

const FiltersBar = ({}: FiltersBarProps) => {
  const sheetRef = useRef<BottomSheetModal>(null)

  return (
    <>
      <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          <Pressable onPress={() => sheetRef.current?.present()}>
            <FilterIcon color={COLORS.text.link} />
          </Pressable>
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
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium,
    fontWeight: 'bold'
  }
})

FiltersBar.displayName = 'FiltersBar'

export default FiltersBar
