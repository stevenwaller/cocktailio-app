import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback, useRef } from 'react'

import useBarStore from '@/lib/stores/useBarStore'
import { TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useBars = (barId?: string) => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const bars = useBarStore((state) => state.bars)
  const bar = useBarStore((state) => state.bars.find((barItem) => barItem.id === barId))
  const defaultBar = useBarStore((state) => state.bars.find((barItem) => barItem.is_default))
  const setBars = useBarStore((state) => state.setBars)
  const setBar = useBarStore((state) => state.setBar)
  const isFirstFetch = useRef(true)

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient
      .from('bars')
      .select(
        `
        *,
        bar_ingredients (
          *,
          ingredient:ingredients (*)
        )
        `,
      )
      .order('created_at', { ascending: true })
      .returns<TBar[]>()

    setIsFetching(false)

    if (response.data) {
      setBars(response.data)
    }
    setError(response.error)
  }, [setBars])

  useEffect(() => {
    if (isFirstFetch.current) {
      fetchData()
    }
  }, [fetchData])

  return { isFetching, fetchData, error, bar, defaultBar, bars, setBars, setBar }
}

export default useBars
