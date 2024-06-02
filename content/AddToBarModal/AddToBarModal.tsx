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
import supabaseClient from '@/lib/utils/supabaseClient'

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

    const handleAddToBar = async (selectedBar: TBar) => {
      modalRef.current?.dismiss()

      const response = await supabaseClient
        .from('bar_ingredients')
        .insert({
          bar_id: selectedBar.id,
          ingredient_id: ingredient?.id,
        })
        .select()
        .single()

      if (response.error) {
        toast.show(response.error.message)
        return
      }

      const normalizedBar = {
        ...selectedBar,
        bar_ingredients: [...selectedBar.bar_ingredients, response.data],
        ingredientsById: {
          ...selectedBar.ingredientsById,
          [ingredient?.id as string]: ingredient as TIngredient,
        },
      }

      setBar(normalizedBar)

      toast.show(`Saved to `, {
        data: {
          add: true,
          bar: selectedBar,
        },
      })
    }

    const handleRemoveFromBar = async (selectedBar: TBar) => {
      modalRef.current?.dismiss()

      const response = await supabaseClient
        .from('bar_ingredients')
        .delete()
        .eq('bar_id', selectedBar.id)
        .eq('ingredient_id', ingredient?.id)

      if (response.error) {
        toast.show(response.error.message)
        return
      }

      const normalizedBar = {
        ...selectedBar,
        bar_ingredients: selectedBar.bar_ingredients.filter(
          (barIngredient) => barIngredient.ingredient_id !== ingredient?.id,
        ),
        ingredientsById: {
          ...selectedBar.ingredientsById,
        },
      }

      delete normalizedBar.ingredientsById[ingredient?.id as string]

      setBar(normalizedBar)

      toast.show(`Removed from `, {
        data: {
          add: false,
          bar: selectedBar,
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
