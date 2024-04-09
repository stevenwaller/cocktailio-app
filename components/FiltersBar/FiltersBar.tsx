import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef, useState } from 'react'
import { StyleSheet, ScrollView, View, Pressable } from 'react-native'

import FilterNav from '@/components/FilterNav'
import ChevronDown from '@/components/_icons/ChevronDown'
import FilterIcon from '@/components/_icons/Filter'
import Button from '@/components/_inputs/Button'
import StackNavModal from '@/components/_overlays/StackNavModal'
import { COLORS, FONTS, SIZE } from '@/lib/constants'
import { IFilter } from '@/lib/types'

interface FiltersBarProps {
  filters: IFilter[]
  onChange: (filter: IFilter) => void
}

const FiltersBar = ({ filters, onChange }: FiltersBarProps) => {
  const [currentFilterName, setCurrentFilterName] = useState<string>()
  const modalRef = useRef<BottomSheetModal>(null)

  const handleFilterPress = (filterName: string) => {
    setCurrentFilterName(filterName)
    modalRef.current?.present()
  }

  return (
    <>
      <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          <Pressable
            style={styles.iconBtn}
            hitSlop={15}
            onPress={() => handleFilterPress('Filters')}
          >
            <FilterIcon color={COLORS.text.action} />
          </Pressable>
          {filters.map((filter) => (
            <Button
              key={filter.name}
              style={styles.button}
              label={filter.name}
              onPress={() => handleFilterPress(filter.name)}
              slotRight={<ChevronDown color={COLORS.text.dark} />}
            />
          ))}
        </View>
      </ScrollView>
      <StackNavModal ref={modalRef}>
        <FilterNav currentFilterName={currentFilterName} filters={filters} onChange={onChange} />
      </StackNavModal>
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
  button: {
    marginRight: 10
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
