import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback, useRef } from 'react'

import useGlassStore from '@/lib/stores/useGlassStore'
import { TGlass } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useGlasses = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const glasses = useGlassStore((state) => state.glasses)
  const setGlasses = useGlassStore((state) => state.setGlasses)
  const isFirstFetch = useRef(true)

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient.from('glasses').select(`*`).returns<TGlass[]>()

    setIsFetching(false)

    if (response.data) {
      setGlasses(response.data)
    }
    setError(response.error)
  }, [setGlasses])

  useEffect(() => {
    if (isFirstFetch.current) {
      fetchData()
    }
  }, [fetchData])

  return { isFetching, fetchData, error, glasses, setGlasses }
}

export default useGlasses
