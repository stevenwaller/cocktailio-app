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
import { TCollection } from '@/lib/types/supabase'
import { collectionNormalizer } from '@/lib/utils/dataNormalizers'
import supabaseClient from '@/lib/utils/supabaseClient'

interface ICollectionsContext {
  isFetching: boolean
  error: PostgrestError | null
  refetch: () => void
  init: () => void
  collections: TCollection[]
  setCollections: (newItems: TCollection[]) => void
  collection?: TCollection
  setCollection: (newItem: TCollection) => void
}

const CollectionsContext = createContext<ICollectionsContext>({
  isFetching: false,
  error: null,
  refetch: () => {},
  init: () => {},
  collections: [],
  setCollections: () => {},
  collection: undefined,
  setCollection: () => {},
})

export const CollectionsProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [items, setItems] = useState<TCollection[]>([])
  const isFirstFetch = useRef(true)
  const didMount = useRef(false)
  const { user } = useUser()

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient
      .from('collections')
      .select(
        `
        *,
        collection_cocktails(*)
        `,
      )
      .returns<TCollection[]>()

    if (response.data) {
      const newCollections = response.data.map((newCollection) => {
        return collectionNormalizer(newCollection)
      })

      setItems(newCollections)
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

  const setItem = useCallback((newItem: TCollection) => {
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
    <CollectionsContext.Provider
      value={{
        isFetching,
        error,
        refetch: fetchData,
        init,
        collections: items,
        setCollections: setItems,
        setCollection: setItem,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}

export const useCollections = (itemId?: string) => {
  const context = useContext(CollectionsContext)

  useEffect(() => {
    context.init()
    // This is intentional, we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (itemId) {
    context.collection = context.collections.find((item) => item.id === itemId)
  }

  return context
}
