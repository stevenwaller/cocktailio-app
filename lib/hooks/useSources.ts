import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback, useRef } from 'react'

import useSourceStore from '@/lib/stores/useSourceStore'
import { TSource } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useSources = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const sources = useSourceStore((state) => state.sources)
  const setSources = useSourceStore((state) => state.setSources)
  const isFirstFetch = useRef(true)

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient.from('sources').select(`*`).returns<TSource[]>()

    setIsFetching(false)

    if (response.data) {
      setSources(response.data)
    }
    setError(response.error)
  }, [setSources])

  useEffect(() => {
    if (isFirstFetch.current) {
      fetchData()
    }
  }, [fetchData])

  return { isFetching, fetchData, error, sources, setSources }
}

export default useSources
