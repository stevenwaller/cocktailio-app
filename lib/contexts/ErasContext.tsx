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

import { TEra } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface IErasContext {
  isFetching: boolean
  error: PostgrestError | null
  refetch: () => void
  init: () => void
  eras: TEra[]
  setEras: (newItems: TEra[]) => void
  era?: TEra
  setEra: (newItem: TEra) => void
}

const ErasContext = createContext<IErasContext>({
  isFetching: false,
  error: null,
  refetch: () => {},
  init: () => {},
  eras: [],
  setEras: () => {},
  era: undefined,
  setEra: () => {},
})

export const ErasProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [items, setItems] = useState<TEra[]>([])
  const isFirstFetch = useRef(true)

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient
      .from('eras')
      .select(`*`)
      .order('start_year')
      .returns<TEra[]>()

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

  const setItem = useCallback((newItem: TEra) => {
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
    <ErasContext.Provider
      value={{
        isFetching,
        error,
        refetch: fetchData,
        init,
        eras: items,
        setEras: setItems,
        setEra: setItem,
      }}
    >
      {children}
    </ErasContext.Provider>
  )
}

export const useEras = (itemId?: string) => {
  const context = useContext(ErasContext)

  useEffect(() => {
    context.init()
    // This is intentional, we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (itemId) {
    context.era = context.eras.find((item) => item.id === itemId)
  }

  return context
}
