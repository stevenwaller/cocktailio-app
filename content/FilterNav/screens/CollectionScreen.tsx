import { Text, StyleSheet, View } from 'react-native'

import { BodyText } from '@/components/_elements/Text'
import RadioInput from '@/components/_inputs/RadioInput'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import { useCollections } from '@/lib/contexts/CollectionsContext'
import { IFilter } from '@/lib/types'
import { TCollection } from '@/lib/types/supabase'

interface CollectionScreenProps {
  filter?: IFilter
  onChange: (filterName: IFilter) => void
}

const CollectionScreen = ({ filter, onChange }: CollectionScreenProps) => {
  const { isFetching, error, collections } = useCollections()

  const handleItemPress = (collection: TCollection) => {
    if (!filter) return

    const newFilter = { ...filter, value: [...filter.value] }

    if (newFilter.value.some((item) => item.id === collection.id)) {
      newFilter.value = newFilter.value.filter((item) => item.id !== collection.id)
    } else {
      newFilter.value.push({ id: collection.id, name: collection.name ? collection.name : '' })
    }

    onChange(newFilter)
  }

  if (isFetching) return <BodyText>Loading...</BodyText>

  if (error) return <BodyText>Error: {error.message}</BodyText>

  return (
    <ModalBody>
      <BodyText style={{ marginBottom: 20 }}>
        {collections.length === 0
          ? 'You have not added a collection yet. Go to the "Collections" tab to do so.'
          : 'Filter cocktails by what you have in a collection'}
      </BodyText>
      {collections.map((collection) => (
        <View key={collection.id} style={styles.item}>
          <RadioInput
            checked={filter?.value.some((item) => item.id === collection.id)}
            onPress={() => handleItemPress(collection)}
          />
          <Text style={styles.itemText}>{collection.name}</Text>
        </View>
      ))}
    </ModalBody>
  )
}

const styles = StyleSheet.create({
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
    paddingTop: 2,
  },
})

CollectionScreen.displayName = 'CollectionScreen'

export default CollectionScreen
