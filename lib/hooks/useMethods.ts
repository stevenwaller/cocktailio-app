import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback, useRef } from 'react'

import useMethodStore from '@/lib/stores/useMethodStore'
import { TMethod } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useMethods = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const methods = useMethodStore((state) => state.methods)
  const setMethods = useMethodStore((state) => state.setMethods)
  const isFirstFetch = useRef(true)

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient.from('methods').select(`*`).returns<TMethod[]>()

    setIsFetching(false)

    if (response.data) {
      setMethods(response.data)
    }
    setError(response.error)
  }, [setMethods])

  useEffect(() => {
    if (isFirstFetch.current) {
      fetchData()
    }
  }, [fetchData])

  return { isFetching, fetchData, error, methods, setMethods }
}

export default useMethods
