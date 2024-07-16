import { createContext } from 'react'

interface ITabsContext {
  onChange: (tab: string) => void
  activeTab?: string
}

const TabsContext = createContext<ITabsContext>({
  onChange: () => {},
})

export default TabsContext
