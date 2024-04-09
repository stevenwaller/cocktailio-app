import { BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Pressable, Text } from 'react-native'

import ChevronRight from '@/components/_icons/ChevronRight'
import { COLORS, FONTS, SIZE } from '@/lib/constants'

const filterScreens = [
  {
    name: 'In Stock',
    screen: 'IN STOCK'
  },
  {
    name: 'Base Spirit',
    screen: 'BASE SPIRIT'
  },
  {
    name: 'Ingredients',
    screen: 'INGREDIENTS'
  },
  {
    name: 'Sources',
    screen: 'SOURCES'
  },
  {
    name: 'Collections',
    screen: 'COLLECTIONS'
  },
  {
    name: 'Method',
    screen: 'METHOD'
  }
]

interface FiltersScreenProps {}

const FiltersScreen = (props: FiltersScreenProps) => {
  const { navigate } = useNavigation()

  return (
    <BottomSheetView style={styles.container}>
      {filterScreens.map((item) => (
        <Pressable
          key={item.name}
          style={styles.item}
          onPress={() => navigate(item.screen as never)}
        >
          <Text style={styles.itemText}>{item.name}</Text>
          <ChevronRight style={styles.itemIcon} color={COLORS.text.link} />
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  itemText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium
  },
  itemIcon: {}
})

FiltersScreen.displayName = 'FiltersScreen'

export default FiltersScreen
