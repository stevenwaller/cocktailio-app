import { useState } from 'react'
import { Alert } from 'react-native'

import FormField from '@/components/_forms/FormField'
import BottomSheetTextInput from '@/components/_inputs/BottomSheetTextInput'
import Button from '@/components/_inputs/Button'
import ModalBody from '@/components/_overlays/ModalBody'
import useBars from '@/lib/hooks/useBars'
import { TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface IEditBarScreen {
  bar?: TBar | null
  onComplete?: () => void
}

const EditBarScreen = ({ bar, onComplete = () => {} }: IEditBarScreen) => {
  const { bars, setBars } = useBars()
  const [value, setValue] = useState(bar ? bar.name : '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async () => {
    if (!value) {
      Alert.alert('Please enter a name')
      return
    }

    setIsSubmitting(true)

    const response = await supabaseClient
      .from('bars')
      .update({ name: value })
      .eq('id', bar?.id)
      .single<TBar>()

    console.log('response', response)

    setIsSubmitting(false)

    if (response.error) {
      Alert.alert(response.error.message)
      return
    }

    const newBars = bars.map((existingBar) => {
      if (existingBar.id === bar?.id) {
        return {
          ...existingBar,
          name: value,
        }
      }

      return existingBar
    })

    setBars(newBars)
    setValue('')

    onComplete()
  }

  return (
    <ModalBody>
      <FormField label="Bar Name">
        <BottomSheetTextInput editable={!isSubmitting} value={value} onChangeText={setValue} />
      </FormField>
      <Button loading={isSubmitting} label="Save" onPress={handleSave} />
    </ModalBody>
  )
}

EditBarScreen.displayName = 'EditBarScreen'

export default EditBarScreen
