import { forwardRef, useState } from 'react'
import { Alert } from 'react-native'

import FormField from '@/components/_forms/FormField'
import BottomSheetTextInput from '@/components/_inputs/BottomSheetTextInput'
import Button from '@/components/_inputs/Button'
import Modal, { IModal, IModalProps } from '@/components/_overlays/Modal'
import ModalBody from '@/components/_overlays/ModalBody'
import ModalHeader from '@/components/_overlays/ModalHeader'
import { useAuth } from '@/lib/contexts/AuthContextProvider'
import useBars from '@/lib/hooks/useBars'
import { TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface NewBarModalProps extends Omit<IModalProps, 'children'> {
  onComplete?: () => void
}

const snapPoints = ['32%']

const NewBarModal = forwardRef<IModal, NewBarModalProps>(({ onComplete = () => {} }, ref) => {
  const { user } = useAuth()
  const { bars, setBars } = useBars()
  const [value, setValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async () => {
    if (!value) {
      Alert.alert('Please enter a name')
      return
    }

    setIsSubmitting(true)

    const barVariables = {
      name: value,
      user_id: user ? user.id : null,
    }

    const response = await supabaseClient.from('bars').insert(barVariables).select().single<TBar>()

    console.log('response', response)

    setIsSubmitting(false)

    if (response.error) {
      Alert.alert(response.error.message)
      return
    }

    setBars([
      ...bars,
      {
        ...response.data,
        bar_ingredients: [],
        ingredientsById: {},
      },
    ])
    setValue('')

    onComplete()
  }

  return (
    <Modal ref={ref} snapPoints={snapPoints}>
      <ModalHeader title="Create new bar" />
      <ModalBody>
        <FormField label="Bar Name">
          <BottomSheetTextInput editable={!isSubmitting} value={value} onChangeText={setValue} />
        </FormField>
        <Button loading={isSubmitting} label="Save" onPress={handleSave} />
      </ModalBody>
    </Modal>
  )
})

NewBarModal.displayName = 'NewBarModal'

export default NewBarModal
