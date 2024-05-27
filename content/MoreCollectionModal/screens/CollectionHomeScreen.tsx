import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet, Pressable, Text, Alert } from 'react-native'

import EditIcon from '@/components/_icons/Edit'
import TrashIcon from '@/components/_icons/Trash'
import ModalBody from '@/components/_overlays/ModalBody'
import { COLORS, FONTS } from '@/lib/constants'
import useCollections from '@/lib/hooks/useCollections'
import { TCollection } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface ICollectionHomeScreen {
  collection?: TCollection | null
  onComplete?: () => void
  onDelete?: () => void
}

const CollectionHomeScreen = ({
  collection,
  onComplete = () => {},
  onDelete = () => {},
}: ICollectionHomeScreen) => {
  const { navigate } = useNavigation()
  const { collections, setCollections } = useCollections()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${collection?.name}?`, '', [
      {
        text: 'No, cancel',
      },
      {
        text: 'Yes, delete it',
        onPress: deleteCollection,
      },
    ])
  }

  const deleteCollection = async () => {
    setIsSubmitting(true)

    const response = await supabaseClient
      .from('collections')
      .delete()
      .eq('id', collection?.id)
      .single<TCollection>()

    if (response.error) {
      Alert.alert(response.error.message)
      return
    }

    const newCollections = collections.filter(
      (existingCollection) => existingCollection.id !== collection?.id,
    )

    setCollections(newCollections)
    setIsSubmitting(false)
    onComplete()
    onDelete()
  }

  return (
    <ModalBody>
      <Pressable
        style={styles.item}
        onPress={() => {
          navigate('Edit Collection' as never)
        }}
      >
        <EditIcon style={styles.icon} color={COLORS.text.link} />
        <Text style={styles.itemName}>Edit Collection</Text>
      </Pressable>
      <Pressable style={styles.item} onPress={handleDelete}>
        <TrashIcon style={styles.icon} width="20" height="20" color={COLORS.text.link} />
        <Text style={styles.itemName}>{isSubmitting ? 'Deleting...' : 'Delete Collection'}</Text>
      </Pressable>
    </ModalBody>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
  },
})

CollectionHomeScreen.displayName = 'CollectionHomeScreen'

export default CollectionHomeScreen
