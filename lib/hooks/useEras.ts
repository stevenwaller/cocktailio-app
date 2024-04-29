import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

import useEraStore from '@/lib/stores/useEraStore'
import { TEra } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const useEras = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const eras = useEraStore((state) => state.eras)
  const setEras = useEraStore((state) => state.setEras)

  const fetchData = async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .from('eras')
      .select(`*`)
      .order('start_year')
      .returns<TEra[]>()

    setIsFetching(false)

    if (response.data) {
      setEras(response.data)
    }
    setError(response.error)
  }

  useEffect(() => {
    if (!eras || eras.length === 0) {
      fetchData()
    }
  }, [])

  return { isFetching, fetchData, error, eras, setEras }
}

export default useEras
