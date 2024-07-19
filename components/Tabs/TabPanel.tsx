import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { useContext } from 'react'
import { ScrollView, View, ViewProps, StyleSheet } from 'react-native'

import TabsContext from './TabsContext'

import { COLORS } from '@/lib/constants'

export interface TabPanelProps extends ViewProps {
  value: string
  scrollable?: boolean
  isInModal?: boolean
}

const TabPanel = ({
  children,
  value,
  style,
  scrollable,
  isInModal,
  ...restProps
}: TabPanelProps) => {
  const { activeTab } = useContext(TabsContext)

  if (activeTab !== value) return null

  if (isInModal) {
    if (scrollable) {
      return (
        <BottomSheetScrollView
          style={styles.container}
          contentContainerStyle={style}
          {...restProps}
        >
          {children}
        </BottomSheetScrollView>
      )
    }

    return (
      <BottomSheetView style={[styles.container, style]} {...restProps}>
        {children}
      </BottomSheetView>
    )
  }

  if (scrollable) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={style} {...restProps}>
        {children}
      </ScrollView>
    )
  }

  return activeTab === value ? (
    <View style={[styles.container, style]} {...restProps}>
      {children}
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 0,
    backgroundColor: COLORS.bg.level3,
  },
})

TabPanel.displayName = 'TabPanel'

export default TabPanel
