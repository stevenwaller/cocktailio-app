import { createStackNavigator } from '@react-navigation/stack'
import { forwardRef, useState, useImperativeHandle, useRef } from 'react'

import AddToCollectionHomeScreen from './screens/AddToCollectionHomeScreen'
import NewCollectionScreen from './screens/NewCollectionScreen'

import StackNavModal, {
  IStackNavModal,
  StackNavModalProps,
} from '@/components/_overlays/StackNavModal'
import { useToast } from '@/lib/contexts/ToastContext'
import { useCollections } from '@/lib/contexts/CollectionsContext'
import { TCollection, TCocktail } from '@/lib/types/supabase'
import { collectionNormalizer } from '@/lib/utils/dataNormalizers'
import { modalScreenOptions } from '@/lib/utils/options'
import supabaseClient from '@/lib/utils/supabaseClient'

export interface IAddToCollectionModal extends IStackNavModal {}

interface AddToCollectionModalProps extends Omit<StackNavModalProps, 'children'> {
  onComplete?: () => void
  onAdd?: (selectedCollection: TCollection) => void
  onRemove?: (selectedCollection: TCollection, cocktail: TCocktail) => void
  cocktail?: TCocktail | null
}

const snapPoints = ['32%']

const Stack = createStackNavigator()

const AddToCollectionModal = forwardRef<IStackNavModal, AddToCollectionModalProps>(
  (
    {
      onComplete = () => {},
      onAdd = () => {},
      onRemove = () => {},
      cocktail,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef<IStackNavModal>(null)
    const toast = useToast()
    const { setCollection } = useCollections()

    useImperativeHandle(ref, () => modalRef.current as IStackNavModal)

    const handleChange = (index: number) => {
      setIsOpen(index !== -1)
      onChange?.(index)
    }

    const handleAddToCollection = async (selectedCollection: TCollection) => {
      modalRef.current?.dismiss()

      const response = await supabaseClient
        .from('collection_cocktails')
        .insert({
          collection_id: selectedCollection.id,
          cocktail_id: cocktail?.id,
        })
        .select()
        .single()

      if (response.error) {
        toast.show(response.error.message)
        return
      }

      const normalizedCollection = collectionNormalizer({
        ...selectedCollection,
        collection_cocktails: [...selectedCollection.collection_cocktails, response.data],
      })

      setCollection(normalizedCollection)

      toast.show(`Saved to `, {
        data: {
          add: true,
          collection: selectedCollection,
        },
      })
    }

    const handleRemoveFromCollection = async (selectedCollection: TCollection) => {
      modalRef.current?.dismiss()

      const response = await supabaseClient
        .from('collection_cocktails')
        .delete()
        .eq('collection_id', selectedCollection.id)
        .eq('cocktail_id', cocktail?.id)

      if (response.error) {
        toast.show(response.error.message)
        return
      }

      const normalizedCollection = collectionNormalizer({
        ...selectedCollection,
        collection_cocktails: selectedCollection.collection_cocktails.filter(
          (collectionCocktail) => collectionCocktail.cocktail_id !== cocktail?.id,
        ),
      })

      setCollection(normalizedCollection)

      if (selectedCollection && cocktail) {
        onRemove(selectedCollection, cocktail)
      }

      toast.show(`Removed from `, {
        data: {
          add: false,
          collection: selectedCollection,
        },
      })
    }

    return (
      <StackNavModal ref={modalRef} snapPoints={snapPoints} onChange={handleChange} {...restProps}>
        <Stack.Navigator screenOptions={modalScreenOptions}>
          <Stack.Screen name="Add to Collection">
            {(props) => (
              <AddToCollectionHomeScreen
                {...props}
                cocktail={cocktail}
                onAdd={handleAddToCollection}
                onRemove={handleRemoveFromCollection}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Create new collection">
            {(props) => (
              <NewCollectionScreen {...props} onAdd={handleAddToCollection} isOpen={isOpen} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </StackNavModal>
    )
  },
)

AddToCollectionModal.displayName = 'AddToCollectionModal'

export default AddToCollectionModal
