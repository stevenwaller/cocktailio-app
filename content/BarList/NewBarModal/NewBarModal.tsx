import { forwardRef, useState } from 'react'
import { Alert } from 'react-native'

import FormField from '@/components/_forms/FormField'
import BottomSheetTextInput from '@/components/_inputs/BottomSheetTextInput'
import Button from '@/components/_inputs/Button'
import Modal, { IModal, IModalProps } from '@/components/_overlays/Modal'
import ModalBody from '@/components/_overlays/ModalBody'
import ModalHeader from '@/components/_overlays/ModalHeader'
import { useBars } from '@/lib/contexts/BarsContext'
import { useUser } from '@/lib/contexts/UserContext'
import { TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface NewBarModalProps extends Omit<IModalProps, 'children'> {
  onComplete?: () => void
}

const snapPoints = ['32%']

const NewBarModal = forwardRef<IModal, NewBarModalProps>(
  ({ onComplete = () => {}, onChange, ...restProps }, ref) => {
    const { user } = useUser()
    const { bars, setBars } = useBars()
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

      const barVariables = {
        name: value,
        user_id: user ? user.id : null,
      }

      const response = await supabaseClient
        .from('bars')
        .insert(barVariables)
        .select()
        .single<TBar>()

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
          all_ingredients_by_id: {},
          ingredients_by_id: {},
        },
      ])
      setValue('')

      onComplete()
    }

    return (
      <Modal ref={ref} snapPoints={snapPoints} onChange={handleChange} {...restProps}>
        <ModalHeader title="Create new bar" />
        <ModalBody>
          <FormField label="Bar Name">
            <BottomSheetTextInput editable={!isSubmitting} value={value} onChangeText={setValue} />
          </FormField>
          <Button loading={isSubmitting} label="Save" onPress={handleSave} />
        </ModalBody>
      </Modal>
    )
  },
)

NewBarModal.displayName = 'NewBarModal'

export default NewBarModal
