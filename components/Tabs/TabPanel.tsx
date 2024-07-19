import { useContext } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

import TabsContext from './TabsContext'

export interface TabPanelProps extends ScrollViewProps {
  value: string
}

const TabPanel = ({ children, value, style, ...restProps }: TabPanelProps) => {
  const { activeTab } = useContext(TabsContext)

  return activeTab === value ? (
    <ScrollView style={style} {...restProps}>
      {children}
    </ScrollView>
  ) : null
}

TabPanel.displayName = 'TabPanel'

export default TabPanel
