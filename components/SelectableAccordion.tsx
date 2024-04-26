import { ViewProps, Text, View, StyleSheet, Pressable } from 'react-native'

import ChevronDownIcon from '@/components/_icons/ChevronDown'
import ChevronUpIcon from '@/components/_icons/ChevronUp'
import AddInput from '@/components/_inputs/AddInput'
import { COLORS, FONTS } from '@/lib/constants'

interface SelectableAccordionProps extends ViewProps {
  level?: number
  isSelectable?: boolean
  label: string
  isOpen: boolean
}

const SelectableAccordion = ({
  label,
  level = 0,
  isSelectable = true,
  isOpen,
  children,
  style,
}: SelectableAccordionProps) => {
  const levelStyles = {
    paddingLeft: level > 1 ? 17 * level : 0,
  }

  return (
    <View style={[styles.accordion, levelStyles, style]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {isSelectable && <AddInput style={styles.addInput} />}
          <Text style={styles.headerLabel}>{label}</Text>
        </View>
        {children && (
          <Pressable>
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
