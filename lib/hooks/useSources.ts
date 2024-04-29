import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import useSourceStore from '@/lib/stores/useSourceStore'
import { TSource } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useSources = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const sources = useSourceStore((state) => state.sources)
  const setSources = useSourceStore((state) => state.setSources)

  const fetchData = async () => {
    setIsFetching(true)

    const response = await supabaseClient.from('sources').select(`*`).returns<TSource[]>()

    setIsFetching(false)

    if (response.data) {
      setSources(response.data)
    }
    setError(response.error)
  }

  useEffect(() => {
    if (!sources || sources.length === 0) {
      fetchData()
    }
  }, [])

  return { isFetching, fetchData, error, sources, setSources }
}

export default useSources
