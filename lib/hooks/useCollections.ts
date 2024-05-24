import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback } from 'react'

import useCollectionStore from '@/lib/stores/useCollectionStore'
import { TCollection } from '@/lib/types/supabase'
import { collectionNormalizer } from '@/lib/utils/dataNormalizers'
import supabaseClient from '@/lib/utils/supabaseClient'

const useCollections = (collectionId?: string) => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const collections = useCollectionStore((state) => state.collections)
  const collection = useCollectionStore((state) =>
    state.collections.find((collection) => collection.id === collectionId),
  )
  const setCollections = useCollectionStore((state) => state.setCollections)
  const setCollection = useCollectionStore((state) => state.setCollection)

  const fetchData = useCallback(async () => {
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
      const newCollections = response.data.map((collection) => {
        return collectionNormalizer(collection)
      })

      setCollections(newCollections)
    }
    setError(response.error)
  }, [setCollections])

  useEffect(() => {
    if (!collections || collections.length === 0) {
      fetchData()
    }
  }, [collections, fetchData])

  return { isFetching, fetchData, error, collection, collections, setCollections, setCollection }
}

export default useCollections
