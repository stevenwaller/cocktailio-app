import { useHeaderHeight } from '@react-navigation/elements'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { PostgrestError } from '@supabase/supabase-js'
import { useState, useEffect, useCallback } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native'

import IngredientsText from '@/components/IngredientsText'
import SearchInput from '@/components/SearchInput'
import { BodyText } from '@/components/_elements/Text'
import { COLORS, FONTS, SEARCH_HEIGHT } from '@/lib/constants'
import useBars from '@/lib/hooks/useBars'
import { CocktailsStackParamList } from '@/lib/types'
import { TCocktail } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface Props {
  barId?: string
  collectionId?: string
}

export default function SearchCocktails({ barId, collectionId }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState<TCocktail[] | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const navigation = useNavigation<NavigationProp<CocktailsStackParamList>>()
  const headerHeight = useHeaderHeight()
  const { defaultBar, bar } = useBars(barId)

  const fetchData = useCallback(async () => {
    if (searchValue) {
      setIsFetching(true)

      const response = await supabaseClient.rpc(
        'query_cocktails',
        {
          bar_id: barId ? barId : null,
          collection_id: collectionId ? collectionId : null,
          search_value: searchValue,
          filter_ingredients: null,
          filter_sources: null,
        },
        { count: 'exact' },
      )

      setIsFetching(false)
      setData(response.data)
      setError(response.error)
    } else {
      setData(null)
      setError(null)
    }
  }, [searchValue, barId, collectionId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <SearchInput
          value={searchValue}
          isFetching={isFetching}
          onChange={setSearchValue}
          onClear={() => setSearchValue('')}
          autoFocus
          placeholder="Search by cocktail name"
          style={{ position: 'absolute', top: 0, zIndex: 1, width: '100%' }}
        />

        <SafeAreaView style={{ marginTop: SEARCH_HEIGHT }}>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 55 }}
            data={data}
            renderItem={({ item }) => (
              <View style={styles.result} key={item.id}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('Cocktail', {
                      cocktailId: item.id,
                      name: item.name,
                    })
                  }
                >
                  <Text style={styles.resultName}>{item.name}</Text>
                  {/* <Text style={styles.resultIngredient}>{renderIngredients(item, defaultBar)}</Text> */}
                  <IngredientsText
                    style={styles.resultIngredient}
                    isInBarStyle={{ color: '#90B761' }}
                    cocktail={item}
                    bar={bar ? bar : defaultBar}
                  />
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => {
              if (error) {
                return <BodyText>Error: {error.message}</BodyText>
              }
              if (searchValue !== '' && !isFetching) {
                return <BodyText>No results found</BodyText>
              }
            }}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  result: {
    marginBottom: 14,
  },
  resultName: {
    fontSize: 20,
    color: COLORS.text.link,
    fontFamily: FONTS.hells.sans.bold,
    marginBottom: 4,
  },
  resultIngredient: {
    fontSize: 14,
    color: '#97B1B8',
    fontFamily: FONTS.hells.sans.medium,
  },
})
