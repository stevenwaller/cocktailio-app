import { BottomSheetModal, BottomSheetFooter } from '@gorhom/bottom-sheet'
import { useRef, useState } from 'react'
import { StyleSheet, ScrollView, View, Pressable, Text, Platform } from 'react-native'

import ChevronDown from '@/components/_icons/ChevronDown'
import FilterIcon from '@/components/_icons/Filter'
import Button from '@/components/_inputs/Button'
import StackNavModal from '@/components/_overlays/StackNavModal'
import FilterNav from '@/content/FilterNav'
import { COLORS, FONTS, SIZE } from '@/lib/constants'
import { IFilter } from '@/lib/types'

interface FiltersBarProps {
  filters: IFilter[]
  onApply: (filters: IFilter[]) => void
}
// TODO
// clear filters
// reset filters on dismiss
const FiltersBar = ({ filters: filtersProp, onApply }: FiltersBarProps) => {
  const [filters, setFilters] = useState<IFilter[]>(filtersProp)
  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>()
  const modalRef = useRef<BottomSheetModal>(null)

  const handleFilterChange = (filter: IFilter) => {
    const newFilters = [...filters]
    newFilters[filter.index] = filter

    setFilters(newFilters)
  }

  const handleFilterPress = (filterIndex?: number) => {
    setCurrentFilterIndex(filterIndex)
    modalRef.current?.present()
  }

  const handleApply = () => {
    onApply(filters)
    modalRef.current?.dismiss()
  }

  const renderFooter = (props: any) => (
    <BottomSheetFooter {...props}>
      <Pressable style={styles.footerButton} onPress={handleApply}>
        <Text style={styles.footerText}>Apply</Text>
      </Pressable>
    </BottomSheetFooter>
  )

  const renderBadge = (filter: IFilter) => {
    if (filter.value.length === 0) return null

    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{filter.value.length}</Text>
      </View>
    )
  }

  return (
    <View>
      <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          <Pressable style={styles.iconBtn} hitSlop={15} onPress={() => handleFilterPress()}>
            <FilterIcon color={COLORS.text.action} />
          </Pressable>
          {filtersProp.map((filter) => (
            <Button
              key={filter.name}
              style={styles.button}
              label={filter.name}
              size="small"
              onPress={() => handleFilterPress(filter.index)}
              slotRight={<ChevronDown color={COLORS.text.dark} width={15} height={15} />}
            >
              {renderBadge(filter)}
            </Button>
          ))}
        </View>
      </ScrollView>
      <StackNavModal ref={modalRef} footerComponent={renderFooter}>
        <FilterNav
          currentFilterIndex={currentFilterIndex}
          filters={filters}
          onChange={handleFilterChange}
        />
      </StackNavModal>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.bg.level2,
    height: 54,
    paddingHorizontal: SIZE.app.paddingX,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    marginRight: 15,
  },
  button: {
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#F0CFBA',
    borderRadius: 50,
    padding: 0.5,
    height: 15,
    minWidth: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 3,
    marginRight: 2,
  },
  badgeText: {
    fontSize: 10,
    color: COLORS.text.dark,
    fontFamily: FONTS.hells.sans.bold,
  },
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium,
    fontWeight: 'bold',
  },
  footerButton: {
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 35 : 15,
    backgroundColor: COLORS.bg.action,
  },
  footerText: {
    fontSize: 16,
    fontFamily: FONTS.hells.sans.bold,
    textAlign: 'center',
    color: COLORS.text.dark,
  },
})

FiltersBar.displayName = 'FiltersBar'

export default FiltersBar
