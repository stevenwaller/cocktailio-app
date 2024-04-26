import { ViewProps, Text, View, StyleSheet, Pressable, StyleProp, TextStyle } from 'react-native'

import ChevronDownIcon from '@/components/_icons/ChevronDown'
import ChevronUpIcon from '@/components/_icons/ChevronUp'
import AddInput from '@/components/_inputs/AddInput'
import { COLORS, FONTS } from '@/lib/constants'

interface SelectableAccordionProps extends ViewProps {
  isSelected?: boolean
  label: string
  isOpen: boolean
  headerLabelStyle?: StyleProp<TextStyle>
  onSelect?: () => void
  onToggle?: () => void
}

const SelectableAccordion = ({
  label,
  isOpen,
  children,
  style,
  headerLabelStyle,
  isSelected,
  onSelect,
  onToggle,
}: SelectableAccordionProps) => {
  return (
    <View style={[styles.accordion, style]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <AddInput style={styles.addInput} onPress={onSelect} checked={isSelected} />
          <Text style={[styles.headerLabel, headerLabelStyle]}>{label}</Text>
        </View>
        {children && (
          <Pressable onPress={onToggle}>
            {isOpen ? (
              <ChevronUpIcon color={COLORS.text.link} />
            ) : (
              <ChevronDownIcon color={COLORS.text.link} />
            )}
          </Pressable>
        )}
      </View>
      {isOpen && <View style={styles.body}>{children}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  accordion: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addInput: {
    marginRight: 9,
  },
  headerLabel: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.bold,
  },
  body: {
    marginTop: 12,
  },
})

SelectableAccordion.displayName = 'SelectableAccordion'

export default SelectableAccordion
