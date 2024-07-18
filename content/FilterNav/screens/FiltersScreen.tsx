import { useNavigation, NavigationProp } from '@react-navigation/native'
import { StyleSheet, Pressable, Text, View } from 'react-native'

import ChevronRight from '@/components/_icons/ChevronRight'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import { IFilter, IFilterValue, FilterNavStackParamList } from '@/lib/types'

interface IFiltersScreen {
  filters: IFilter[]
}

const FiltersScreen = ({ filters }: IFiltersScreen) => {
  const navigation = useNavigation<NavigationProp<FilterNavStackParamList>>()
  const { navigate } = navigation

  const renderValue = (value: IFilterValue[]) => {
    const maxLength = value.length > 3 ? 3 : value.length
    let valueString = ''

    for (let i = 0; i < maxLength; i++) {
      valueString += `${i !== 0 ? ', ' : ''}${value[i].name}`
    }

    if (value.length > maxLength) {
      valueString += `, +${value.length - maxLength} more`
    }

    return valueString
  }

  return (
    <ModalBody>
      {filters.map((filter) => (
        <Pressable key={filter.name} style={styles.filter} onPress={() => navigate(filter.name)}>
          <Text style={styles.filterName}>{filter.name}</Text>
          <View style={styles.filterRight}>
            <View style={styles.filterValue}>
              <Text style={styles.filterValueText}>{renderValue(filter.value)}</Text>
            </View>
            <ChevronRight style={styles.filterIcon} color={COLORS.text.link} />
          </View>
        </Pressable>
      ))}
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterName: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    flexShrink: 0,
    flexGrow: 1,
  },
  filterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 1,
    flexGrow: 0,
  },
  filterValue: {
    marginRight: 5,
    marginLeft: 10,
  },
  filterValueText: {
    fontSize: 12,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    textAlign: 'right',
  },
  filterIcon: {},
})

FiltersScreen.displayName = 'FiltersScreen'

export default FiltersScreen
