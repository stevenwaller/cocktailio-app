import { useState, useEffect } from 'react'
import { Alert } from 'react-native'

import FormField from '@/components/_forms/FormField'
import BottomSheetTextInput from '@/components/_inputs/BottomSheetTextInput'
import Button from '@/components/_inputs/Button'
import ModalBody from '@/components/_overlays/ModalBody'
import useCollections from '@/lib/hooks/useCollections'
import { TCollection } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface IEditCollectionScreen {
  collection?: TCollection | null
  onComplete?: () => void
  isOpen?: boolean
}

const EditCollectionScreen = ({
  collection,
  onComplete = () => {},
  isOpen,
}: IEditCollectionScreen) => {
  const { collections, setCollections } = useCollections()
  const [value, setValue] = useState(collection ? collection.name : '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setValue('')
    }
  }, [isOpen])

  const handleSave = async () => {
    if (!value) {
      Alert.alert('Please enter a name')
      return
    }

    setIsSubmitting(true)

    const response = await supabaseClient
      .from('collections')
      .update({ name: value })
      .eq('id', collection?.id)
      .single<TCollection>()

    console.log('response', response)

    setIsSubmitting(false)

    if (response.error) {
      Alert.alert(response.error.message)
      return
    }

    const newCollections = collections.map((existingCollection) => {
      if (existingCollection.id === collection?.id) {
        return {
          ...existingCollection,
          name: value,
        }
      }

      return existingCollection
    })

    setCollections(newCollections)
    setValue('')

    onComplete()
  }

  return (
    <ModalBody>
      <FormField label="Collection Name">
        <BottomSheetTextInput editable={!isSubmitting} value={value} onChangeText={setValue} />
      </FormField>
      <Button loading={isSubmitting} label="Save" onPress={handleSave} />
    </ModalBody>
  )
}

EditCollectionScreen.displayName = 'EditCollectionScreen'

export default EditCollectionScreen
