import { forwardRef, useState } from 'react'
import { Alert } from 'react-native'

import FormField from '@/components/_forms/FormField'
import BottomSheetTextInput from '@/components/_inputs/BottomSheetTextInput'
import Button from '@/components/_inputs/Button'
import Modal, { IModal, IModalProps } from '@/components/_overlays/Modal'
import ModalBody from '@/components/_overlays/ModalBody'
import ModalHeader from '@/components/_overlays/ModalHeader'
import { useAuth } from '@/lib/contexts/AuthContextProvider'
import useCollections from '@/lib/hooks/useCollections'
import { TCollection } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface NewCollectionModalProps extends Omit<IModalProps, 'children'> {
  onComplete?: () => void
}

const snapPoints = ['32%']

const NewCollectionModal = forwardRef<IModal, NewCollectionModalProps>(
  ({ onComplete = () => {}, onChange, ...restProps }, ref) => {
    const { user } = useAuth()
    const { collections, setCollections } = useCollections()
    const [value, setValue] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (index: number) => {
      if (index === -1) {
        setValue('')
        setIsSubmitting(false)
      }
      onChange?.(index)
    }

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

      console.log('response', response)

      setIsSubmitting(false)

      if (response.error) {
        Alert.alert(response.error.message)
        return
      }

      setCollections([
        ...collections,
        {
          ...response.data,
        },
      ])
      setValue('')

      onComplete()
    }

    return (
      <Modal ref={ref} snapPoints={snapPoints} onChange={handleChange} {...restProps}>
        <ModalHeader title="Create new collection" />
        <ModalBody>
          <FormField label="Collection Name">
            <BottomSheetTextInput editable={!isSubmitting} value={value} onChangeText={setValue} />
          </FormField>
          <Button loading={isSubmitting} label="Save" onPress={handleSave} />
        </ModalBody>
      </Modal>
    )
  },
)

NewCollectionModal.displayName = 'NewCollectionModal'

export default NewCollectionModal
