import { PostgrestError } from '@supabase/supabase-js'
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react'

import { TGlass } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface IGlassesContext {
  isFetching: boolean
  error: PostgrestError | null
  refetch: () => void
  init: () => void
  glasses: TGlass[]
  setGlasses: (newItems: TGlass[]) => void
  glass?: TGlass
  setGlass: (newItem: TGlass) => void
}

const GlassesContext = createContext<IGlassesContext>({
  isFetching: false,
  error: null,
  refetch: () => {},
  init: () => {},
  glasses: [],
  setGlasses: () => {},
  glass: undefined,
  setGlass: () => {},
})

export const GlassesProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [items, setItems] = useState<TGlass[]>([])
  const isFirstFetch = useRef(true)

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient.from('glasses').select(`*`).returns<TGlass[]>()

    if (response.data) {
      setItems(response.data)
    }

    setError(response.error)

    setIsFetching(false)
  }, [])

  const init = useCallback(() => {
    if (isFirstFetch.current) {
      fetchData()
    }
  }, [fetchData])

  const setItem = useCallback((newItem: TGlass) => {
    setItems((state) => {
      return state.map((item) => {
        if (item.id === newItem.id) {
          return newItem
        }
        return item
      })
    })
  }, [])

  return (
    <GlassesContext.Provider
      value={{
        isFetching,
        error,
        refetch: fetchData,
        init,
        glasses: items,
        setGlasses: setItems,
        setGlass: setItem,
      }}
    >
      {children}
    </GlassesContext.Provider>
  )
}

export const useGlasses = (itemId?: string) => {
  const context = useContext(GlassesContext)

  useEffect(() => {
    context.init()
    // This is intentional, we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (itemId) {
    context.glass = context.glasses.find((item) => item.id === itemId)
  }

  return context
}
