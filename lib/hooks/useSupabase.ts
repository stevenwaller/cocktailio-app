import { PostgrestError } from '@supabase/supabase-js'
import { useState, useEffect, useCallback } from 'react'

import supabaseClient from '@/lib/utils/supabaseClient'

interface IUseSupabase {
  tableName: string
  select?: string
  filters?: {
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike' | 'is'
    key: string
    value: string | number | boolean | null
  }[]
  orders?: {
    column: string
    args?: any
  }[]
}

const useSupabase = <ItemType>({ tableName, select = '*', filters, orders }: IUseSupabase) => {
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<ItemType[] | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [count, setCount] = useState<number | null>(null)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    let query = supabaseClient.from(tableName).select(select).returns<ItemType[]>()

    if (filters) {
      filters.forEach(({ operator, key, value }) => {
        // @ts-expect-error
        query = query[operator](key, value)
      })
    }

    if (orders) {
      orders.forEach(({ column, args }) => {
        if (args) {
          query = query.order(column, args)
        } else {
          query = query.order(column)
        }
      })
    }

    const response = await query

    setIsFetching(false)
    setData(response.data)
    setError(response.error)
    setCount(response.count)
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [])

  return { data, error, isFetching, count, refetch: fetchData }
}

export const useSupabaseSingle = <ItemType>({ tableName, select = '*', filters }: IUseSupabase) => {
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<ItemType | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [count, setCount] = useState<number | null>(null)

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    let query = supabaseClient.from(tableName).select(select).returns<ItemType[]>().single()

    if (filters) {
      filters.forEach(({ operator, key, value }) => {
        // @ts-expect-error
        query = query[operator](key, value)
      })
    }

    const response = await query

    setIsFetching(false)
    setData(response.data)
    setError(response.error)
    setCount(response.count)
  }, [filters])

  useEffect(() => {
    fetchData()
  }, [])

  return { data, error, isFetching, count, refetch: fetchData }
}

export default useSupabase
