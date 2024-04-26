import { PostgrestError } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

import BarCard from '@/components/BarCard'
import { BodyText } from '@/components/_elements/Text'
import Button from '@/components/_inputs/Button'
import useBarStore from '@/lib/stores/useBarStore'
import { TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const BarList = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const bars = useBarStore((state) => state.bars)
  const setBars = useBarStore((state) => state.setBars)
  const setBarsById = useBarStore((state) => state.setBarsById)

  const fetchData = async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .from('bars')
      .select(
        `
        *,
        ingredients:bar_ingredients (
          *,
          ingredient:ingredients (*)
        )
        `,
      )
      .returns<TBar[]>()

    setIsFetching(false)
    if (response.data) {
      const barsById: Record<string, TBar> = {}

      response.data.forEach((bar) => {
        barsById[bar.id] = bar
      })

      setBarsById(barsById)
      setBars(response.data)
    }
    setError(response.error)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateNewBar = () => {
    console.log('create new bar')
  }

  if (error) {
    return <BodyText>Error: {error.message}</BodyText>
  }

  if (isFetching) {
    return <BodyText>Loading...</BodyText>
  }

  if (bars.length === 0) {
    return <BodyText>No bars found</BodyText>
  }

  return (
    <>
      {bars.map((bar: any) => (
        <BarCard key={bar.id} bar={bar} />
      ))}
      <Button label="Create New Bar" onPress={handleCreateNewBar} />
    </>
  )
}

BarList.displayName = 'BarList'

export default BarList