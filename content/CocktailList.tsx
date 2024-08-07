import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, FlatList, Text, View, RefreshControl, SafeAreaView } from 'react-native'

import CocktailsHeaderBtns from '@/app/TabNav/_sharedHeaderBtns/CocktailsHeaderBtns'
import CocktailCard from '@/components/CocktailCard'
import ErrorAlert from '@/components/ErrorAlert'
import FiltersBar from '@/components/FiltersBar'
import { BodyText, PageTitleText } from '@/components/_elements/Text'
import Skeleton from '@/components/_loaders/Skeleton'
import AddToCollectionModal, { IAddToCollectionModal } from '@/content/AddToCollectionModal'
import DefaultBarModal, { IDefaultBarModal } from '@/content/DefaultBarModal'
import SortModal, { ISortModal } from '@/content/SortModal'
import { COLORS, FONTS, SIZE } from '@/lib/constants'
import { useBars } from '@/lib/contexts/BarsContext'
import { useCollections } from '@/lib/contexts/CollectionsContext'
import { useIngredients } from '@/lib/contexts/IngredientsContext'
import { IFilter, CocktailsStackParamList, SortableColumns } from '@/lib/types'
import { TCollection, TCocktail } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const itemsToLoad = 10

type Props = {
  barId?: string
  collectionId?: string
  name?: string
  showBarStock?: boolean
  onSearchPress?: () => void
  onMorePress?: () => void
}

const CocktailList = ({
  barId: barIdProp,
  collectionId: collectionIdProp,
  name: nameProp,
  onSearchPress = () => {},
  onMorePress,
  showBarStock,
}: Props) => {
  const [minRange, setMinRange] = useState<number>(0)
  const [maxRange, setMaxRange] = useState<number>(itemsToLoad - 1)
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<TCocktail[]>([])
  const [error, setError] = useState<PostgrestError | null>(null)
  const [cocktailToBookmark, setCocktailToBookmark] = useState<TCocktail | null>(null)
  const [count, setCount] = useState<number>(0)
  const [sortColumn, setSortColumn] = useState<SortableColumns>('created_at')
  const [isAscending, setIsAscending] = useState<boolean>(false)
  const { collections } = useCollections()
  const { bars, defaultBar, bar } = useBars(barIdProp)
  const { ingredientsById } = useIngredients()
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(false)
  const isRefetch = useRef(false)
  const addToCollectionModalRef = useRef<IAddToCollectionModal | null>(null)
  const defaultBarModalRef = useRef<IDefaultBarModal>(null)
  const sortModalRef = useRef<ISortModal>(null)
  const navigation = useNavigation<NavigationProp<CocktailsStackParamList>>()
  const route = useRoute<RouteProp<CocktailsStackParamList, 'Cocktails'>>()
  const currentBar = bar ? bar : defaultBar
  const ingredientParam = route.params?.ingredient
  const baseSpiritParam = route.params?.baseSpirit
  const methodParam = route.params?.method
  const eraParam = route.params?.era
  const glassParam = route.params?.glass

  const [filters, setFilters] = useState<IFilter[]>([
    ...(barIdProp
      ? []
      : [
          {
            name: 'With Bar Stock',
            value: [],
          } as IFilter,
        ]),
    {
      name: 'Base Spirit',
      rowName: 'base_ingredient_id',
      value: baseSpiritParam ? [baseSpiritParam] : [],
    },
    {
      name: 'Ingredient',
      value: ingredientParam ? [ingredientParam] : [],
    },
    ...(collectionIdProp
      ? []
      : [
          {
            name: 'Collection',
            value: [],
          } as IFilter,
        ]),
    {
      name: 'Method',
      rowName: 'method_id',
      value: methodParam ? [methodParam] : [],
    },
    {
      name: 'Era',
      rowName: 'era_id',
      value: eraParam ? [eraParam] : [],
    },
    {
      name: 'Glassware',
      rowName: 'glass_id',
      value: glassParam ? [glassParam] : [],
    },
  ])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CocktailsHeaderBtns
          sortColumn={sortColumn}
          isAscending={isAscending}
          showBarStock={showBarStock && bars.length > 1}
          onSortPress={() => {
            sortModalRef.current?.present()
          }}
          onBarStockPress={() => {
            defaultBarModalRef.current?.present()
          }}
          onSearchPress={onSearchPress}
          onMorePress={onMorePress}
        />
      ),
    })
  }, [navigation, bars, sortColumn, isAscending, onMorePress, showBarStock, onSearchPress])

  const fetchData = useCallback(async () => {
    setIsFetching(true)

    // To filter by Bar we need to provide the bar_id
    let barId = barIdProp ? barIdProp : null
    const barStockFilter = filters.find((filter) => filter.name === 'With Bar Stock')

    if (barStockFilter) {
      if (barStockFilter.value.length > 0) {
        barId = barStockFilter.value[0].id
      }
    }

    // To filter by collection we need to provide the collection_id
    let collectionId = collectionIdProp ? collectionIdProp : null
    const collectionFilter = filters.find((filter) => filter.name === 'Collection')

    if (collectionFilter) {
      if (collectionFilter.value.length > 0) {
        collectionId = collectionFilter.value[0].id
      }
    }

    // To filter by Ingredients we need an object where the key is the ingredient id
    const ingredientFilter: Record<string, string> = {}

    filters
      .find((filter) => filter.name === 'Ingredient')
      ?.value.forEach((item) => {
        ingredientFilter[item.id] = item.name
      })

    const query = supabaseClient
      .rpc(
        'query_cocktails',
        {
          bar_id: barId,
          collection_id: collectionId,
          cocktail_id: null,
          search_value: null,
          filter_ingredients: ingredientFilter,
        },
        { count: 'exact' },
      )
      .range(minRange, maxRange)
      .order(sortColumn, { ascending: isAscending })

    filters.forEach((filter) => {
      const values = filter.value.map((item) => item.id)

      switch (filter.name) {
        case 'Base Spirit':
        case 'Method':
        case 'Era':
        case 'Glassware':
          if (values.length > 0) {
            query.in(filter.rowName ? filter.rowName : '', values)
          }
          break
        default:
          break
      }
    })

    const response = await query.returns<TCocktail[]>()

    setIsFetching(false)
    setData((prevData) => {
      if (isRefetch.current) {
        return response.data ? response.data : []
      } else {
        return response.data ? [...prevData, ...response.data] : prevData
      }
    })
    setError(response.error)
    setCount(response.count ? response.count : 0)
    setIsFirstPageReceived(true)
    isRefetch.current = false
  }, [minRange, maxRange, filters, barIdProp, collectionIdProp, isRefetch, sortColumn, isAscending])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const fetchNextPage = () => {
    if (maxRange + itemsToLoad >= count) return

    setMinRange(minRange + itemsToLoad)
    setMaxRange(maxRange + itemsToLoad)
  }

  const reFetchData = () => {
    isRefetch.current = true
    setMinRange(0)
    setMaxRange(itemsToLoad - 1)
    fetchData()
  }

  const handleFilterApply = (newFilters: IFilter[]) => {
    setFilters([...newFilters])
    setIsFirstPageReceived(false)
    setMinRange(0)
    setMaxRange(itemsToLoad - 1)
    setData([])
  }

  const handleBookmark = async (cocktail: TCocktail) => {
    setCocktailToBookmark(cocktail)

    addToCollectionModalRef.current?.present()
  }

  const handleBookmarkRemove = (selectedCollection: TCollection, cocktail: TCocktail) => {
    if (selectedCollection.id === collectionIdProp) {
      const newCocktails = data.filter((item) => item.id !== cocktail.id)
      setData(newCocktails)
    }
  }

  const handleSortChange = (column: SortableColumns, newIsAscending: boolean) => {
    isRefetch.current = true
    setSortColumn(column)
    setIsAscending(newIsAscending)
  }

  const checkIfBookmarked = (cocktailId: string): boolean => {
    let isBookmarked = false

    collections.forEach((collection) => {
      if (collection.cocktail_ids_by_id[cocktailId]) {
        isBookmarked = true
      }
    })

    return isBookmarked
  }

  const renderContent = () => {
    if (
      isFirstPageReceived === false &&
      (isFetching || Object.keys(ingredientsById).length === 0)
    ) {
      return (
        <View style={styles.pageContainer}>
          <View style={styles.header}>
            {nameProp && (
              <Skeleton style={{ marginTop: -2, marginBottom: 10 }} width={150} height={27} />
            )}
            <Skeleton style={{ marginTop: 1, marginBottom: 2 }} width={75} height={17} />
          </View>
          <Skeleton style={styles.card} height={95} />
          <Skeleton style={styles.card} height={95} />
          <Skeleton style={styles.card} height={95} />
          <Skeleton style={styles.card} height={95} />
          <Skeleton style={styles.card} height={95} />
          <Skeleton style={styles.card} height={95} />
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.pageContainer}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.header}>
              <ErrorAlert message={error?.message} />
              {nameProp && <PageTitleText>{nameProp}</PageTitleText>}
              <Text style={styles.count}>
                {count} cocktail{count > 1 && 's'}
              </Text>
            </View>
          }
          data={data}
          renderItem={({ item }) => (
            <CocktailCard
              style={styles.card}
              key={item.id}
              cocktail={item}
              onBookmarkPress={handleBookmark}
              isBookmarked={checkIfBookmarked(item.id)}
              bar={currentBar}
            />
          )}
          keyExtractor={(cocktail) => cocktail.id}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={reFetchData}
              tintColor={COLORS.text.body}
            />
          }
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.8}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text style={styles.emptyListTitle}>No cocktails found</Text>
              <BodyText style={styles.emptyListBody}>
                {collectionIdProp && 'Try adding more cocktails to this collection. '}
                {barIdProp && 'Add more ingredients to your bar stock. '}
              </BodyText>
              <BodyText style={styles.emptyListBody}>Try changing the filters</BodyText>
            </View>
          )}
        />
      </SafeAreaView>
    )
  }

  return (
    <>
      <View>
        <FiltersBar
          style={{ position: 'absolute', zIndex: 100 }}
          filters={filters}
          onApply={handleFilterApply}
        />
        {renderContent()}
      </View>
      <AddToCollectionModal
        ref={addToCollectionModalRef}
        cocktail={cocktailToBookmark}
        onRemove={handleBookmarkRemove}
      />
      <DefaultBarModal ref={defaultBarModalRef} />
      <SortModal
        ref={sortModalRef}
        sortColumn={sortColumn}
        isAscending={isAscending}
        onSortChange={handleSortChange}
      />
    </>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 54,
  },
  header: {
    marginTop: SIZE.marginY,
    marginLeft: SIZE.app.paddingX,
    marginRight: SIZE.app.paddingX,
    marginBottom: 20,
  },
  emptyList: {
    borderWidth: 1,
    borderColor: COLORS.bg.level3,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginLeft: SIZE.app.paddingX,
    marginRight: SIZE.app.paddingX,
  },
  emptyListTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.schotis.bold,
  },
  emptyListBody: {
    textAlign: 'center',
  },
  count: {
    fontSize: 16,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.mediumItalic,
  },
  card: {
    marginLeft: SIZE.app.paddingX,
    marginRight: SIZE.app.paddingX,
    marginBottom: 20,
  },
  footer: {
    height: 40,
  },
})

CocktailList.displayName = 'CocktailList'

export default CocktailList
