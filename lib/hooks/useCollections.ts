import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback, useRef } from 'react'

import useCollectionStore from '@/lib/stores/useCollectionStore'
import { TCollection } from '@/lib/types/supabase'
import { collectionNormalizer } from '@/lib/utils/dataNormalizers'
import supabaseClient from '@/lib/utils/supabaseClient'

const useCollections = (collectionId?: string) => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const collections = useCollectionStore((state) => state.collections)
  const collection = useCollectionStore((state) =>
    state.collections.find((item) => item.id === collectionId),
  )
  const setCollections = useCollectionStore((state) => state.setCollections)
  const setCollection = useCollectionStore((state) => state.setCollection)
  const isFirstFetch = useRef(true)

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

    setIsFetching(false)

    if (response.data) {
      const newCollections = response.data.map((newCollection) => {
        return collectionNormalizer(newCollection)
      })

      setCollections(newCollections)
    }
    setError(response.error)
  }, [setCollections])

  useEffect(() => {
    if (isFirstFetch.current) {
      fetchData()
    }
  }, [fetchData])

  return { isFetching, fetchData, error, collection, collections, setCollections, setCollection }
}

export default useCollections
