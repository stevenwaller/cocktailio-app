import { ViewProps, Text, View, StyleSheet, Pressable, StyleProp, TextStyle } from 'react-native'

import Badge from '@/components/Badge'
import ChevronDownIcon from '@/components/_icons/ChevronDown'
import ChevronUpIcon from '@/components/_icons/ChevronUp'
import AddInput from '@/components/_inputs/AddInput'
import { COLORS, FONTS } from '@/lib/constants'

interface SelectableAccordionProps extends ViewProps {
  noSelect?: boolean
  noExpand?: boolean
  isSelected?: boolean
  label: string
  isOpen: boolean
  count?: number
  headerLabelStyle?: StyleProp<TextStyle>
  bodyStyle?: StyleProp<TextStyle>
  onSelect?: () => void
  onToggle?: () => void
}

const SelectableAccordion = ({
  label,
  isOpen,
  children,
  noSelect,
  noExpand,
  style,
  bodyStyle,
  count,
  headerLabelStyle,
  isSelected,
  onSelect,
  onToggle,
  ...restProps
}: SelectableAccordionProps) => {
  const renderChevron = () => {
    if (noExpand) return null

    return (
      <Pressable onPress={onToggle}>
        {isOpen ? (
          <ChevronUpIcon color={COLORS.text.link} />
        ) : (
          <ChevronDownIcon color={COLORS.text.link} />
        )}
      </Pressable>
    )
  }

  return (
    <View style={[styles.accordion, style]} {...restProps}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {!noSelect && (
            <AddInput style={styles.addInput} onPress={onSelect} checked={isSelected} />
          )}
          <Text style={[styles.headerLabel, headerLabelStyle]}>{label}</Text>
        </View>
        {children && (
          <View style={styles.headerRight}>
            {!isOpen && count ? <Badge style={styles.badge}>{count}</Badge> : null}
            {renderChevron()}
          </View>
        )}
      </View>
      {isOpen && children && <View style={[styles.body, bodyStyle]}>{children}</View>}
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginRight: 10,
    marginLeft: 3,
  },
  addInput: {
    marginRight: 9,
  },
  headerLabel: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
  },
  body: {
    // marginTop: 12,
  },
})

SelectableAccordion.displayName = 'SelectableAccordion'

export default SelectableAccordion
