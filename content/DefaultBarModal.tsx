import { forwardRef, useState, useImperativeHandle, useRef } from 'react'
import { View, Text, StyleSheet, Switch, Alert } from 'react-native'

import Modal, { IModal, IModalProps } from '@/components/_overlays/Modal'
import ModalBody from '@/components/_overlays/ModalBody'
import ModalHeader from '@/components/_overlays/ModalHeader'
import { FONTS, COLORS } from '@/lib/constants'
import useBars from '@/lib/hooks/useBars'
import { TCollection, TCocktail, TBar } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

export interface IDefaultBarModal extends IModal {}

interface Props extends Omit<IModalProps, 'children'> {
  onComplete?: () => void
  onAdd?: (selectedCollection: TCollection) => void
  onRemove?: (selectedCollection: TCollection, cocktail: TCocktail) => void
  cocktail?: TCocktail | null
}

const snapPoints = ['35%']

const DefaultBarModal = forwardRef<IDefaultBarModal, Props>(
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
    const modalRef = useRef<IDefaultBarModal>(null)
    const { bars, setBar, setBars } = useBars()

    useImperativeHandle(ref, () => modalRef.current as IDefaultBarModal)

    const handleChange = (index: number) => {
      setIsOpen(index !== -1)
      onChange?.(index)
    }

    const handleMakeBarDefault = async (bar: TBar) => {
      if (bar.is_default) {
        setBar({ ...bar, is_default: false })

        const response = await supabaseClient
          .from('bars')
          .update({ is_default: !bar.is_default })
          .eq('id', bar?.id)

        if (response.error) {
          setBar({ ...bar, is_default: true })
          Alert.alert(response.error.message)
        }
      } else {
        const newBars = bars.map((existingBar) => {
          if (existingBar.id === bar.id) {
            return { ...existingBar, is_default: true }
          }
          return { ...existingBar, is_default: false }
        })

        setBars(newBars)

        for (const newBar of newBars) {
          const response = await supabaseClient
            .from('bars')
            .update({ is_default: newBar.is_default })
            .eq('id', newBar.id)

          if (response.error) {
            setBars(bars)
            Alert.alert(response.error.message)
          }
        }
      }
    }

    return (
      <Modal ref={modalRef} snapPoints={snapPoints} onChange={handleChange} {...restProps}>
        <ModalHeader title="Default Bar" />
        <ModalBody>
          <Text style={styles.description}>
            The default bar's stock of ingredients will be used to highlight which cocktails you can
            make when browsing recipes
          </Text>
          {bars.map((bar) => (
            <View key={bar.id} style={styles.bar}>
              <Text style={styles.barName}>{bar.name}</Text>
              <Switch
                style={styles.icon}
                ios_backgroundColor={COLORS.bg.level1}
                trackColor={{ false: COLORS.bg.level1, true: COLORS.text.good }}
                onValueChange={() => handleMakeBarDefault(bar)}
                thumbColor={COLORS.text.body}
                value={!!bar.is_default}
              />
            </View>
          ))}
        </ModalBody>
      </Modal>
    )
  },
)

const styles = StyleSheet.create({
  description: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 14,
    color: COLORS.text.body,
    marginBottom: 20,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  barName: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 18,
    color: COLORS.text.body,
  },
  icon: {
    marginLeft: 15,
    height: 30,
  },
})

DefaultBarModal.displayName = 'DefaultBarModal'

export default DefaultBarModal
