import { useRef, useState } from 'react'
import { StyleSheet, Alert } from 'react-native'

import BarCard from '@/components/BarCard'
import { BodyText } from '@/components/_elements/Text'
import FormField from '@/components/_forms/FormField'
import PlusIcon from '@/components/_icons/Plus'
import BottomSheetTextInput from '@/components/_inputs/BottomSheetTextInput'
import Button from '@/components/_inputs/Button'
import Modal, { IModal } from '@/components/_overlays/Modal'
import ModalBody from '@/components/_overlays/ModalBody'
import ModalFooter from '@/components/_overlays/ModalFooter'
import ModalHeader from '@/components/_overlays/ModalHeader'
import { COLORS } from '@/lib/constants'
import { useAuth } from '@/lib/contexts/AuthContextProvider'
import useBars from '@/lib/hooks/useBars'
import { TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

const snapPoints = ['30%']

const BarList = () => {
  const { user } = useAuth()
  const { isFetching, error, bars, setBars } = useBars()
  const modalRef = useRef<IModal>(null)
  const [inputValue, setInputValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateNewBar = () => {
    console.log('create new bar')
    modalRef.current?.present()
  }

  const handleSave = async () => {
    if (!inputValue) {
      Alert.alert('Please enter a name')
      return
    }

    setIsSubmitting(true)

    const barVariables = {
      name: inputValue,
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

    modalRef.current?.dismiss()
  }

  const renderFooter = (props: any) => (
    <ModalFooter {...props}>
      <Button label="Save" onPress={handleSave} />
    </ModalFooter>
  )

  if (error) {
    return <BodyText>Error: {error.message}</BodyText>
  }

  if (isFetching) {
    return <BodyText>Loading...</BodyText>
  }

  if (bars.length === 0) {
    return <BodyText>No bars found</BodyText>
  }

  return (
    <>
      {bars.map((bar: any) => (
        <BarCard key={bar.id} bar={bar} />
      ))}
      <Button
        slotLeft={<PlusIcon color={COLORS.text.dark} />}
        label="Create New Bar"
        onPress={handleCreateNewBar}
        loading={isSubmitting}
      />
      <Modal ref={modalRef} footerComponent={renderFooter} snapPoints={snapPoints}>
        <ModalHeader title="Create new bar" />
        <ModalBody>
          <FormField label="Bar name">
            <BottomSheetTextInput editable={!isSubmitting} onChangeText={setInputValue} />
          </FormField>
        </ModalBody>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({})

BarList.displayName = 'BarList'

export default BarList
