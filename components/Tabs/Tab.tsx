import { useContext } from 'react'
import { ViewProps, StyleSheet, Pressable, Text } from 'react-native'

import TabsContext from './TabsContext'

import { COLORS, FONTS, TAB_HEIGHT, SIZE } from '@/lib/constants'

export interface TabProps extends ViewProps {
  value: string
  isLast?: boolean
  children?: React.ReactNode
  icon?: React.ReactNode
}

const Tab = ({ children, value, isLast, style, icon, ...restProps }: TabProps) => {
  const { activeTab, onChange } = useContext(TabsContext)

  const isActive = activeTab === value

  return (
    <Pressable
      style={[styles.tab, isActive && styles.activeTab, isLast && { borderRightWidth: 0 }, style]}
      onPress={() => onChange(value)}
      {...restProps}
    >
      {icon}
      {children && (
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>{children}</Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tab: {
    height: TAB_HEIGHT,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.bg.level1,
    borderTopStartRadius: SIZE.border.radius,
    borderTopEndRadius: SIZE.border.radius,
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
})

Tab.displayName = 'Tab'

export default Tab
