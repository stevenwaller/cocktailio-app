import { useState } from 'react'
import { Alert } from 'react-native'

import FormField from '@/components/_forms/FormField'
import BottomSheetTextInput from '@/components/_inputs/BottomSheetTextInput'
import Button from '@/components/_inputs/Button'
import { useCollections } from '@/lib/contexts/CollectionsContext'
import { useUser } from '@/lib/contexts/UserContext'
import { TCollection } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface INewCollectionFormProps {
  onComplete?: (newCollection: TCollection) => void
}

const NewCollectionForm = ({ onComplete = () => {} }: INewCollectionFormProps) => {
  const { user } = useUser()
  const { collections, setCollections } = useCollections()
  const [value, setValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async () => {
    if (!value) {
      Alert.alert('Please enter a name')
      return
    }

    setIsSubmitting(true)

    const collectionValues = {
      name: value,
      user_id: user ? user.id : null,
    }

    const response = await supabaseClient
      .from('collections')
      .insert(collectionValues)
      .select()
      .single<TCollection>()

    setIsSubmitting(false)

    if (response.error) {
      Alert.alert(response.error.message)
      return
    }

    const newCollection = {
      ...response.data,
      collection_cocktails: [],
      cocktail_ids_by_id: {},
      cocktail_ids: [],
    }

    setCollections([...collections, newCollection])
    setValue('')

    onComplete(newCollection)
  }

  return (
    <>
      <FormField label="Collection Name">
        <BottomSheetTextInput editable={!isSubmitting} value={value} onChangeText={setValue} />
      </FormField>
      <Button loading={isSubmitting} label="Save" onPress={handleSave} />
    </>
  )
}

NewCollectionForm.displayName = 'NewCollectionForm'

export default NewCollectionForm
