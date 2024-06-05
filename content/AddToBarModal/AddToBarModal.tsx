import { createStackNavigator } from '@react-navigation/stack'
import { forwardRef, useState, useImperativeHandle, useRef } from 'react'

import AddToBarHomeScreen from './screens/AddToBarHomeScreen'
import NewBarScreen from './screens/NewBarScreen'

import StackNavModal, {
  IStackNavModal,
  StackNavModalProps,
} from '@/components/_overlays/StackNavModal'
import { useToast } from '@/lib/contexts/ToastContext'
import useBars from '@/lib/hooks/useBars'
import { TBar, TIngredient } from '@/lib/types/supabase'
import { modalScreenOptions } from '@/lib/utils/options'
import updateBarStock from '@/lib/utils/updateBarStock'

export interface IAddToBarModal extends IStackNavModal {}

interface AddToBarModalProps extends Omit<StackNavModalProps, 'children'> {
  onComplete?: () => void
  onAdd?: (selectedBar: TBar) => void
  onRemove?: (selectedBar: TBar, ingredient: TIngredient) => void
  ingredient?: TIngredient | null
}

const snapPoints = ['32%']

const Stack = createStackNavigator()

const AddToBarModal = forwardRef<IStackNavModal, AddToBarModalProps>(
  (
    {
      onComplete = () => {},
      onAdd = () => {},
      onRemove = () => {},
      ingredient,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef<IStackNavModal>(null)
    const toast = useToast()
    const { setBar } = useBars()

    useImperativeHandle(ref, () => modalRef.current as IStackNavModal)

    const handleChange = (index: number) => {
      setIsOpen(index !== -1)
      onChange?.(index)
    }

    const handleAddToBar = (selectedBar: TBar) => {
      modalRef.current?.dismiss()

      if (!ingredient) return

      updateBarStock({
        bar: selectedBar,
        ingredient,
        setBar,
        onError: (error) => {
          toast.show(error.message)
        },
        onSuccess: (bar: TBar) => {
          toast.show(`Saved to `, {
            data: {
              add: true,
              bar,
            },
          })
        },
      })
    }

    const handleRemoveFromBar = (selectedBar: TBar) => {
      modalRef.current?.dismiss()

      if (!ingredient) return

      updateBarStock({
        bar: selectedBar,
        ingredient,
        setBar,
        onError: (error) => {
          toast.show(error.message)
        },
        onSuccess: (bar: TBar) => {
          toast.show(`Removed from `, {
            data: {
              add: false,
              bar,
            },
          })
        },
      })
    }

    return (
      <StackNavModal ref={modalRef} snapPoints={snapPoints} onChange={handleChange} {...restProps}>
        <Stack.Navigator screenOptions={modalScreenOptions}>
          <Stack.Screen name="Add to Bar">
            {(props) => (
              <AddToBarHomeScreen
                {...props}
                ingredient={ingredient}
                onAdd={handleAddToBar}
                onRemove={handleRemoveFromBar}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Create new bar">
            {(props) => <NewBarScreen {...props} onAdd={handleAddToBar} isOpen={isOpen} />}
          </Stack.Screen>
        </Stack.Navigator>
      </StackNavModal>
    )
  },
)

AddToBarModal.displayName = 'AddToBarModal'

export default AddToBarModal
