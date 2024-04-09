import { PostgrestError } from '@supabase/supabase-js'
import { useState, useEffect, useCallback } from 'react'

import supabaseClient from '@/lib/utils/supabaseClient'

interface IUseSupabase {
  tableName: string
  select?: string
  args?: {
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike'
    key: string
    value: string | number | boolean
  }[]
}

const useSupabase = <ItemType>({ tableName, select = '*', args }: IUseSupabase) => {
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<ItemType[] | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [count, setCount] = useState<number | null>(null)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    let query = supabaseClient.from(tableName).select(select).returns<ItemType[]>()

    if (args) {
      args.forEach(({ operator, key, value }) => {
        switch (operator) {
          case 'eq':
            // @ts-expect-error
            query = query.eq(key, value)
            break
        }
      })
    }

    // TODO: build out the rest of the query base on args

    const response = await query

    setIsFetching(false)
    setData(response.data)
    setError(response.error)
    setCount(response.count)
  }, [args])

  useEffect(() => {
    fetchData()
  }, [])

  return { data, error, isFetching, count, refetch: fetchData }
}

export default useSupabase
