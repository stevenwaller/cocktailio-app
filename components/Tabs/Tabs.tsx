import { ReactNode, useState } from 'react'

import TabsContext from './TabsContext'

interface Props {
  defaultValue?: string
  children: ReactNode
}

const Tabs = ({ children, defaultValue }: Props) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ onChange: setActiveTab, activeTab }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.displayName = 'Tabs'

export default Tabs
