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

import { TMethod } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface IMethodsContext {
  isFetching: boolean
  error: PostgrestError | null
  refetch: () => void
  init: () => void
  methods: TMethod[]
  setMethods: (newItems: TMethod[]) => void
  method?: TMethod
  setMethod: (newItem: TMethod) => void
}

const MethodsContext = createContext<IMethodsContext>({
  isFetching: false,
  error: null,
  refetch: () => {},
  init: () => {},
  methods: [],
  setMethods: () => {},
  method: undefined,
  setMethod: () => {},
})

export const MethodsProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [items, setItems] = useState<TMethod[]>([])
  const isFirstFetch = useRef(true)

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient.from('methods').select(`*`).returns<TMethod[]>()

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

  const setItem = useCallback((newItem: TMethod) => {
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
    <MethodsContext.Provider
      value={{
        isFetching,
        error,
        refetch: fetchData,
        init,
        methods: items,
        setMethods: setItems,
        setMethod: setItem,
      }}
    >
      {children}
    </MethodsContext.Provider>
  )
}

export const useMethods = (itemId?: string) => {
  const context = useContext(MethodsContext)

  useEffect(() => {
    context.init()
    // This is intentional, we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (itemId) {
    context.method = context.methods.find((item) => item.id === itemId)
  }

  return context
}
