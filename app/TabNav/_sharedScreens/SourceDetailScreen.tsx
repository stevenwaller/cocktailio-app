import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import { FONTS, COLORS } from '@/lib/constants'
import { CocktailsStackParamList } from '@/lib/types'
import { TSource } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

type Props = NativeStackScreenProps<CocktailsStackParamList, 'Source Detail'>

export default function SourceDetailScreen({ route }: Props) {
  const [isFetching, setIsFetching] = useState(false)
  const [source, setSource] = useState<TSource | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const sourceId = route.params?.sourceId
  const name = route.params?.name

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    const response = await supabaseClient
      .from('sources')
      .select(
        `
        *
        `,
      )
      .eq('id', sourceId)
      .returns<TSource>()
      .single()

    setIsFetching(false)
    setSource(response.data)
    setError(response.error)
  }, [sourceId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const renderContent = () => {
    if (isFetching) {
      return <BodyText>Loading...</BodyText>
    }

    if (error) {
      return <BodyText>Error: {error.message}</BodyText>
    }

    if (!source) {
      return <BodyText>No data</BodyText>
    }

    return (
      <>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{source.name}</Text>
        </View>
      </>
    )
  }

  return (
    <PageContainer>
      <View style={styles.header}>
        <PageTitleText>{name}</PageTitleText>
      </View>
      {renderContent()}
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  header: {},
  description: {
    marginTop: 10,
  },
  descriptionText: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    color: COLORS.text.body,
  },
})
