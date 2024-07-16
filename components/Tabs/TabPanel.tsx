import { useContext } from 'react'
import { View, ViewProps } from 'react-native'

import TabsContext from './TabsContext'

export interface TabPanelProps extends ViewProps {
  value: string
}

const TabPanel = ({ children, value, style, ...restProps }: TabPanelProps) => {
  const { activeTab } = useContext(TabsContext)

  return activeTab === value ? (
    <View style={style} {...restProps}>
      {children}
    </View>
  ) : null
}

TabPanel.displayName = 'TabPanel'

export default TabPanel
