import { PostgrestError } from '@supabase/supabase-js'
import { View, StyleSheet, Text } from 'react-native'

import { BodyText } from '@/components/_elements/Text'
import AddInput from '@/components/_inputs/AddInput'
import SelectableItemLoader from '@/components/_loaders/SelectableItemLoader'
import Skeleton from '@/components/_loaders/Skeleton'
import { COLORS, FONTS } from '@/lib/constants'
import { IFilter } from '@/lib/types'

interface IItem {
  id: string
  name: string
}

interface IProps<ItemType> {
  isFetching: boolean
  error?: PostgrestError | null
  items: ItemType[]
  filter?: IFilter
  description?: string
  noItemsDescription?: string
  numberOfPlaceholders?: number
  onChange?: (filterName: IFilter) => void
}

export default function FilterItemsList<ItemType extends IItem>({
  isFetching,
  error,
  items,
  filter,
  description,
  noItemsDescription,
  onChange = () => {},
  numberOfPlaceholders = 3,
}: IProps<ItemType>) {
  const handleItemPress = (item: ItemType) => {
    if (!filter) return

    const newFilter = { ...filter, value: [...filter.value] }

    if (newFilter.value.some((filterValue) => filterValue.id === item.id)) {
      newFilter.value = newFilter.value.filter((filterValue) => filterValue.id !== item.id)
    } else {
      newFilter.value.push({ id: item.id, name: item.name ? item.name : '' })
    }

    onChange(newFilter)
  }

  const renderPlaceholders = () => {
    const placeholders = []
    for (let i = 0; i < numberOfPlaceholders; i++) {
      placeholders.push(
        <SelectableItemLoader key={i} style={styles.item} bgColor={COLORS.bg.level4} />,
      )
    }
    return placeholders
  }

  if (isFetching)
    return (
      <>
        {description && (
          <>
            <Skeleton
              style={{ marginTop: 2, marginBottom: 24 }}
              bgColor={COLORS.bg.level4}
              height={15}
            />
          </>
        )}
        {renderPlaceholders()}
      </>
    )

  if (error) return <BodyText>Error: {error.message}</BodyText>

  if (!items) return <BodyText>No data</BodyText>

  const renderDescription = () => {
    if (items.length === 0 && noItemsDescription) {
      return <BodyText style={styles.description}>{noItemsDescription}</BodyText>
    }

    if (description) {
      return <BodyText style={styles.description}>{description}</BodyText>
    }
  }

  return (
    <>
      {renderDescription()}
      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <AddInput
            checked={filter?.value.some((filterValue) => filterValue.id === item.id)}
            onPress={() => handleItemPress(item)}
          />
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  itemText: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 1,
  },
})
