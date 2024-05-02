import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import useCollectionStore from '@/lib/stores/useCollectionStore'
import { TCollection } from '@/lib/types/supabase'
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

  const fetchData = async () => {
    setIsFetching(true)

    const response = await supabaseClient.from('collections').select(`*`).returns<TCollection[]>()

    setIsFetching(false)

    if (response.data) {
      setCollections(response.data)
    }
    setError(response.error)
  }

  useEffect(() => {
    if (!collections || collections.length === 0) {
      fetchData()
    }
  }, [])

  return { isFetching, fetchData, error, collection, collections, setCollections, setCollection }
}

export default useCollections
