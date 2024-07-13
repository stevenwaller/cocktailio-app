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

import { useUser } from '@/lib/contexts/UserContext'
import { TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface IBarsContext {
  isFetching: boolean
  error: PostgrestError | null
  refetch: () => void
  init: () => void
  bars: TBar[]
  setBars: (newBars: TBar[]) => void
  bar?: TBar
  setBar: (newBar: TBar) => void
  defaultBar?: TBar
}

const BarsContext = createContext<IBarsContext>({
  isFetching: false,
  error: null,
  refetch: () => {},
  init: () => {},
  bars: [],
  setBars: () => {},
  bar: undefined,
  setBar: () => {},
  defaultBar: undefined,
})

export const BarsProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [items, setItems] = useState<TBar[]>([])
  const defaultBar = items.find((item) => item.is_default)
  const isFirstFetch = useRef(true)
  const didMount = useRef(false)
  const { user } = useUser()

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient.rpc('query_bars', { bar_id: null })

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

  useEffect(() => {
    if (didMount.current) {
      isFirstFetch.current = true
      setItems([])
    } else {
      didMount.current = true
    }
  }, [user])

  const setItem = useCallback((newItem: TBar) => {
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
    <BarsContext.Provider
      value={{
        isFetching,
        error,
        refetch: fetchData,
        init,
        bars: items,
        setBars: setItems,
        setBar: setItem,
        defaultBar,
      }}
    >
      {children}
    </BarsContext.Provider>
  )
}

export const useBars = (barId?: string) => {
  const context = useContext(BarsContext)

  useEffect(() => {
    context.init()
    // This is intentional, we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (barId) {
    context.bar = context.bars.find((barItem) => barItem.id === barId)
  }

  return context
}
