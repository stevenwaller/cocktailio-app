import { useState } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'

import AllIngredients from './components/AllIngredients'
import SelectedIngredients from './components/SelectedIngredientList'

import DeselectIcon from '@/components/_icons/Deselect'
import ShowSelectedIcon from '@/components/_icons/ShowSelected'
import ShowSelectedSolidIcon from '@/components/_icons/ShowSelectedSolid'
import { FONTS, COLORS } from '@/lib/constants'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
  onDeselectAll?: () => void
}

const IngredientList = ({ checkIfSelected, onSelect, onDeselectAll }: Props) => {
  const [showSelected, setShowSelected] = useState(false)

  return (
    <View style={styles.ingredientsContainer}>
      <View style={styles.controls}>
        <Pressable style={styles.control} onPress={onDeselectAll}>
          <DeselectIcon style={styles.controlIcon} color={COLORS.text.link} />
          <Text style={styles.controlText}>Deselect All</Text>
        </Pressable>
        <Pressable style={styles.control} onPress={() => setShowSelected(!showSelected)}>
          {showSelected ? (
            <ShowSelectedSolidIcon style={styles.controlIcon} color={COLORS.text.link} />
          ) : (
            <ShowSelectedIcon style={styles.controlIcon} color={COLORS.text.link} />
          )}
          <Text style={styles.controlText}>Show Selected</Text>
        </Pressable>
      </View>
      {showSelected ? (
        <SelectedIngredients onSelect={onSelect} checkIfSelected={checkIfSelected} />
      ) : (
        <AllIngredients onSelect={onSelect} checkIfSelected={checkIfSelected} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bg.level2,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIcon: {
    marginRight: 7,
  },
  controlText: {
    fontFamily: FONTS.hells.sans.bold,
    fontSize: 14,
    color: COLORS.text.link,
  },
  ingredientsContainer: {
    // paddingTop: 10,
    // paddingRight: 15,
    // paddingBottom: 20,
    // paddingLeft: 20,
  },
})

IngredientList.displayName = 'IngredientList'

export default IngredientList
