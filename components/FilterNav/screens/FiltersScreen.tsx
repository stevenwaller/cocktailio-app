import { BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Pressable, Text, View } from 'react-native'

import ChevronRight from '@/components/_icons/ChevronRight'
import { COLORS, FONTS } from '@/lib/constants'
import { IFilter } from '@/lib/types'

interface IFiltersScreen {
  filters: IFilter[]
}

const FiltersScreen = ({ filters }: IFiltersScreen) => {
  const { navigate } = useNavigation()

  return (
    <BottomSheetView style={styles.container}>
      {filters.map((filter) => (
        <Pressable
          key={filter.name}
          style={styles.filter}
          onPress={() => navigate(filter.screen as never)}
        >
          <Text style={styles.filterName}>{filter.name}</Text>
          <View style={styles.filterRight}>
            <Text style={styles.filterValue}>
              {filter.value.map((value, index) => {
                return `${index !== 0 ? ', ' : ''}${value.name}`
              })}
            </Text>
            <ChevronRight style={styles.filterIcon} color={COLORS.text.link} />
          </View>
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
    paddingLeft: 20,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterName: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
  },
  filterRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterValue: {
    fontSize: 12,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
  },
  filterIcon: {},
})

FiltersScreen.displayName = 'FiltersScreen'

export default FiltersScreen
