import { createContext, useContext, ReactNode } from 'react'

import { useBars } from '@/lib/contexts/BarsContext'
import { TBar } from '@/lib/types/supabase'

interface ICurrentBarContext {
  currentBar?: TBar
}

const CurrentBarContext = createContext<ICurrentBarContext>({})

interface ICurrentBarProvider {
  children: ReactNode
  currentBarId?: string
}

export const CurrentBarProvider = ({ children, currentBarId }: ICurrentBarProvider) => {
  const { defaultBar, bar } = useBars(currentBarId)
  let currentBar

  if (bar) {
    currentBar = bar
  } else if (defaultBar) {
    currentBar = defaultBar
  }

  return <CurrentBarContext.Provider value={{ currentBar }}>{children}</CurrentBarContext.Provider>
}

export const useCurrentBar = () => {
  return useContext(CurrentBarContext)
}
