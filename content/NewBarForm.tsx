import { useState } from 'react'
import { Alert } from 'react-native'

import FormField from '@/components/_forms/FormField'
import BottomSheetTextInput from '@/components/_inputs/BottomSheetTextInput'
import Button from '@/components/_inputs/Button'
import useBars from '@/lib/hooks/useBars'
import useUserStore from '@/lib/stores/useUserStore'
import { TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

interface INewBarFormProps {
  onComplete?: (newBar: TBar) => void
}

const NewBarForm = ({ onComplete = () => {} }: INewBarFormProps) => {
  const { user } = useUserStore()
  const { bars, setBars } = useBars()
  const [value, setValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async () => {
    if (!value) {
      Alert.alert('Please enter a name')
      return
    }

    setIsSubmitting(true)

    const barValues = {
      name: value,
      user_id: user ? user.id : null,
    }

    const response = await supabaseClient.from('bars').insert(barValues).select().single<TBar>()

    setIsSubmitting(false)

    if (response.error) {
      Alert.alert(response.error.message)
      return
    }

    const newBar = {
      ...response.data,
      bar_ingredients: [],
      ingredientsById: {},
    }

    setBars([...bars, newBar])
    setValue('')

    onComplete(newBar)
  }

  return (
    <>
      <FormField label="Bar Name">
        <BottomSheetTextInput editable={!isSubmitting} value={value} onChangeText={setValue} />
      </FormField>
      <Button loading={isSubmitting} label="Save" onPress={handleSave} />
    </>
  )
}

NewBarForm.displayName = 'NewBarForm'

export default NewBarForm
