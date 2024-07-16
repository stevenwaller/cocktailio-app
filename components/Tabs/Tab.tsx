import { useContext } from 'react'
import { ViewProps, StyleSheet, Pressable, Text } from 'react-native'

import TabsContext from './TabsContext'

import { COLORS, FONTS } from '@/lib/constants'

export interface TabProps extends ViewProps {
  value: string
  isLast?: boolean
  children: React.ReactNode
}

const Tab = ({ children, value, isLast, style, ...restProps }: TabProps) => {
  const { activeTab, onChange } = useContext(TabsContext)

  const isActive = activeTab === value

  return (
    <Pressable
      style={[styles.tab, isActive && styles.activeTab, isLast && { borderRightWidth: 0 }, style]}
      onPress={() => onChange(value)}
      {...restProps}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tab: {
    height: 45,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg.level2,
    borderRightWidth: 1,
    borderRightColor: COLORS.bg.level1,
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
