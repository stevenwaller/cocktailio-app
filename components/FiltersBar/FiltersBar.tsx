import { useRef, useState } from 'react'
import { StyleSheet, ScrollView, View, ViewProps } from 'react-native'

import Badge from '@/components/Badge'
import ChevronDown from '@/components/_icons/ChevronDown'
import FilterIcon from '@/components/_icons/Filter'
import Button from '@/components/_inputs/Button'
import StackNavModal, { IStackNavModal } from '@/components/_overlays/StackNavModal'
import FilterNav from '@/content/FilterNav'
import { COLORS, FONTS, SIZE } from '@/lib/constants'
import { IFilter } from '@/lib/types'

interface FiltersBarProps extends ViewProps {
  filters: IFilter[]
  onApply: (filters: IFilter[]) => void
}

const FiltersBar = ({ filters, onApply, style }: FiltersBarProps) => {
  const [currentFilterIndex, setCurrentFilterIndex] = useState<number>()
  const modalRef = useRef<IStackNavModal>(null)
  const [snapPoints, setSnapPoints] = useState(['50%'])

  const handleFilterChange = (filter: IFilter) => {
    const newFilters = [...filters]
    const index = newFilters.findIndex((item) => item.name === filter.name)
    newFilters[index] = filter

    onApply(newFilters)
  }

  const handleFilterPress = (filter?: IFilter) => {
    if (filter?.name === 'Ingredient') {
      setSnapPoints(['90%'])
    } else {
      setSnapPoints(['50%', '90%'])
    }

    const index = filters.findIndex((item) => item.name === filter?.name)

    setCurrentFilterIndex(index)

    modalRef.current?.present()
  }

  const renderTotalBadge = () => {
    let total = 0

    filters.forEach((filter) => {
      total += filter.value.length
    })

    if (total === 0) return null

    return (
      <Badge style={styles.iconBadge} isLink>
        {total}
      </Badge>
    )
  }

  const renderBadge = (filter: IFilter) => {
    if (filter.value.length === 0) return null

    return (
      <Badge style={styles.badge} isLink>
        {filter.value.length}
      </Badge>
    )
  }

  return (
    <View style={style}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingRight: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.filters}>
          <Button
            style={[styles.button, styles.filterButton]}
            size="small"
            onPress={() => handleFilterPress()}
          >
            <FilterIcon color={COLORS.text.dark} width={20} height={20} />
            {renderTotalBadge()}
          </Button>
          {filters.map((filter) => (
            <Button
              key={filter.name}
              style={styles.button}
              label={filter.name}
              size="small"
              onPress={() => handleFilterPress(filter)}
              slotRight={<ChevronDown color={COLORS.text.dark} width={15} height={15} />}
            >
              {renderBadge(filter)}
            </Button>
          ))}
        </View>
      </ScrollView>
      <StackNavModal ref={modalRef} snapPoints={snapPoints}>
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
  button: {
    marginRight: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 7,
  },
  badge: {
    marginLeft: 3,
    marginRight: 2,
  },
  iconBadge: {
    marginLeft: 3,
  },
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium,
    fontWeight: 'bold',
  },
})

FiltersBar.displayName = 'FiltersBar'

export default FiltersBar
