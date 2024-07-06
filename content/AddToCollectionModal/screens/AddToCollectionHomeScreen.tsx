import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Pressable, Text, View } from 'react-native'

import PlusIcon from '@/components/_icons/Plus'
import AddInput from '@/components/_inputs/AddInput'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import { useCollections } from '@/lib/contexts/CollectionsContext'
import { TCollection, TCocktail } from '@/lib/types/supabase'

interface IAddToCollectionHomeScreen {
  cocktail?: TCocktail | null
  onComplete?: () => void
  onAdd?: (collection: TCollection) => void
  onRemove?: (collection: TCollection) => void
}

const AddToCollectionHomeScreen = ({
  cocktail,
  onComplete = () => {},
  onAdd = () => {},
  onRemove = () => {},
}: IAddToCollectionHomeScreen) => {
  const { navigate } = useNavigation()
  const { collections } = useCollections()

  return (
    <ModalBody>
      {collections.map((collection) => (
        <View key={collection.id} style={styles.item}>
          <AddInput
            onPress={(value, checked) => {
              if (checked) {
                onRemove(collection)
              } else {
                onAdd(collection)
              }
            }}
            checked={collection.cocktail_ids_by_id[cocktail?.id as string] !== undefined}
          />
          <Text style={styles.itemName}>{collection.name}</Text>
        </View>
      ))}
      <Pressable style={styles.item} onPress={() => navigate('Create new collection' as never)}>
        <View style={styles.addIcon}>
          <PlusIcon color={COLORS.text.link} />
        </View>
        <Text style={[styles.itemName, { color: COLORS.text.link }]}>Create new Collection</Text>
      </Pressable>
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 15,
  },
  addIcon: {
    borderRadius: 50,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    marginLeft: 10,
    paddingTop: 2,
  },
})

AddToCollectionHomeScreen.displayName = 'AddToCollectionHomeScreen'

export default AddToCollectionHomeScreen
