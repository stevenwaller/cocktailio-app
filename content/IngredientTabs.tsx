import { View, Text, Pressable, StyleSheet } from 'react-native'

import { COLORS, FONTS } from '@/lib/constants'

interface Props {
  showSelected?: boolean
  onPress?: (showSelected: boolean) => void
}

const IngredientTabs = ({ showSelected, onPress = () => {} }: Props) => {
  return (
    <View style={styles.tabs}>
      <Pressable
        style={[styles.tab, !showSelected && styles.activeTab]}
        onPress={() => onPress(false)}
      >
        <Text style={[styles.tabText, !showSelected && styles.activeTabText]}>All</Text>
      </Pressable>
      <Pressable
        style={[styles.tab, showSelected && styles.activeTab]}
        onPress={() => onPress(true)}
      >
        <Text style={[styles.tabText, showSelected && styles.activeTabText]}>Selected</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: COLORS.bg.level1,
    flexDirection: 'row',
  },
  tab: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: COLORS.bg.level2,
  },
  activeTab: {
    backgroundColor: COLORS.bg.level3,
  },
  tabText: {
    fontFamily: FONTS.hells.sans.bold,
    fontSize: 16,
    color: COLORS.text.link,
  },
  activeTabText: {
    color: COLORS.text.body,
  },
  ingredientsContainer: {
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 20,
  },
})

IngredientTabs.displayName = 'IngredientTabs'

export default IngredientTabs
