import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import useGlassStore from '@/lib/stores/useGlassStore'
import { TGlass } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useGlasses = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const glasses = useGlassStore((state) => state.glasses)
  const setGlasses = useGlassStore((state) => state.setGlasses)

  const fetchData = async () => {
    setIsFetching(true)

    const response = await supabaseClient.from('glasses').select(`*`).returns<TGlass[]>()

    setIsFetching(false)

    if (response.data) {
      setGlasses(response.data)
    }
    setError(response.error)
  }

  useEffect(() => {
    if (!glasses || glasses.length === 0) {
      fetchData()
    }
  }, [])

  return { isFetching, fetchData, error, glasses, setGlasses }
}

export default useGlasses