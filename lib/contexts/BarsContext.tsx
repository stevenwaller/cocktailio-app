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
  const [bars, setBars] = useState<TBar[]>([])
  const defaultBar = bars.find((barItem) => barItem.is_default)
  const isFirstFetch = useRef(true)
  const didMount = useRef(false)
  const { user } = useUser()

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient
      .from('bars')
      .select(
        `
        *,
        bar_ingredients (
          *,
          ingredient:ingredients (*)
        )
        `,
      )
      .order('created_at', { ascending: true })
      .returns<TBar[]>()

    if (response.data) {
      setBars(response.data)
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
      setBars([])
    } else {
      didMount.current = true
    }
  }, [user])

  const setBar = useCallback((newBar: TBar) => {
    setBars((state) => {
      return state.map((bar) => {
        if (bar.id === newBar.id) {
          return newBar
        }
        return bar
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
        bars,
        setBars,
        setBar,
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
