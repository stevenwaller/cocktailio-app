import { BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Pressable, Text } from 'react-native'

import ChevronRight from '@/components/_icons/ChevronRight'
import { COLORS, FONTS } from '@/lib/constants'
import { IFilter } from '@/lib/types'

interface IFiltersScreen {
  filters: IFilter[]
}

const FiltersScreen = ({ filters }: IFiltersScreen) => {
  const { navigate } = useNavigation()

  console.log('filters', filters)

  return (
    <BottomSheetView style={styles.container}>
      <Text>Filters</Text>
      {filters.map((filter) => (
        <Pressable
          key={filter.name}
          style={styles.filter}
          onPress={() => navigate(filter.screen as never)}
        >
          <Text style={styles.filterText}>{filter.name}</Text>
          <ChevronRight style={styles.filterIcon} color={COLORS.text.link} />
        </Pressable>
      ))}
    </BottomSheetView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg.level3,
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 20
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  filterText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium
  },
  filterIcon: {}
})

FiltersScreen.displayName = 'FiltersScreen'

export default FiltersScreen
