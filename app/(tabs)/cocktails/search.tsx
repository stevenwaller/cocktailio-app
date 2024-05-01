import { PostgrestError } from '@supabase/supabase-js'
import { Stack, Link } from 'expo-router'
import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, TextInput, ActivityIndicator, Text } from 'react-native'

import PageContainer from '@/components/PageContainer'
import { BodyText } from '@/components/_elements/Text'
import SearchIcon from '@/components/_icons/Search'
import { COLORS, FONTS } from '@/lib/constants'
import supabaseClient from '@/lib/utils/supabaseClient'

interface ISearchResult {
  id: string
  name: string
  description: string
  note: string
}

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState<ISearchResult[] | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

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
          <Link
            href={{
              pathname: `/cocktails/${item.id}`,
              params: { name: item.name },
            }}
          >
            <Text style={styles.resultName}>{item.name}</Text>
          </Link>
        </View>
      ))
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Search',
          headerTitleAlign: 'center',
        }}
      />
      <View>
        <TextInput
          style={styles.input}
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Search by keyword, ingredient, etc..."
          placeholderTextColor="#AAAEB0"
          autoFocus
        />
        {isFetching ? (
          <ActivityIndicator style={styles.spinner} color={COLORS.text.body} />
        ) : (
          <SearchIcon style={styles.searchIcon} color={COLORS.text.body} pointerEvents="box-none" />
        )}
      </View>
      <PageContainer>{renderContent()}</PageContainer>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.bg.level2,
    color: COLORS.text.body,
    height: 48,
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    paddingStart: 40,
    paddingEnd: 20,
  },
  spinner: {
    position: 'absolute',
    top: 15,
    left: 8,
  },
  searchIcon: {
    position: 'absolute',
    top: 13,
    left: 8,
  },
  result: {
    marginBottom: 5,
  },
  resultName: {
    fontSize: 20,
    color: COLORS.text.link,
    fontFamily: FONTS.hells.sans.medium,
  },
})

Search.displayName = 'Search'

export default Search
