import { useNavigation, NavigationProp } from '@react-navigation/native'
import { PostgrestError } from '@supabase/supabase-js'
import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'

import PageContainer from '@/components/PageContainer'
import SearchInput from '@/components/SearchInput'
import { BodyText } from '@/components/_elements/Text'
import { COLORS, FONTS } from '@/lib/constants'
import { CocktailsStackParamList } from '@/lib/types'
import supabaseClient from '@/lib/utils/supabaseClient'

interface ISearchResult {
  id: string
  name: string
  description: string
  note: string
}

export default function SearchCocktails() {
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState<ISearchResult[] | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const navigation = useNavigation<NavigationProp<CocktailsStackParamList>>()

  const fetchData = useCallback(async () => {
    if (searchValue) {
      setIsFetching(true)
      const response = await supabaseClient.rpc('search_cocktails', { search_value: searchValue })

      setIsFetching(false)
      setData(response.data)
      setError(response.error)
    } else {
      setData(null)
      setError(null)
    }
  }, [searchValue])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const renderContent = () => {
    if (error) {
      return <BodyText>{error.message}</BodyText>
    }

    if (searchValue && !isFetching && (!data || data.length === 0)) {
      return <BodyText>No results found</BodyText>
    }

    if (data) {
      return data.map((item) => (
        <View style={styles.result} key={item.id}>
          <Pressable
            onPress={() =>
              navigation.navigate('Cocktail Detail', {
                cocktailId: item.id,
                name: item.name,
              })
            }
          >
            <Text style={styles.resultName}>{item.name}</Text>
          </Pressable>
        </View>
      ))
    }
  }

  return (
    <>
      <SearchInput
        value={searchValue}
        isFetching={isFetching}
        onChange={setSearchValue}
        autoFocus
        placeholder="Search by cocktail name"
      />
      <PageContainer>{renderContent()}</PageContainer>
    </>
  )
}

const styles = StyleSheet.create({
  result: {
    marginBottom: 5,
  },
  resultName: {
    fontSize: 20,
    color: COLORS.text.link,
    fontFamily: FONTS.hells.sans.medium,
  },
})
