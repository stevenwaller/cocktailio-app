import { createStackNavigator } from '@react-navigation/stack'
import { forwardRef, useState } from 'react'

import BarHomeScreen from './screens/BarHomeScreen'
import EditBarScreen from './screens/EditBarScreen'

import StackNavModal, {
  IStackNavModal,
  StackNavModalProps,
} from '@/components/_overlays/StackNavModal'
import { useBars } from '@/lib/contexts/BarsContext'
import { modalScreenOptions } from '@/lib/utils/options'

export interface IMoreBarModal extends IStackNavModal {}

export interface IMoreBarModalProps extends Omit<StackNavModalProps, 'children'> {
  barId?: string
  onComplete?: () => void
  onDelete?: () => void
}

const snapPoints = ['38%']

const Stack = createStackNavigator()

const MoreBarModal = forwardRef<IMoreBarModal, IMoreBarModalProps>(
  ({ barId, onComplete = () => {}, onDelete = () => {}, onChange, ...restProps }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const { bar } = useBars(barId)

    const handleChange = (index: number) => {
      setIsOpen(index !== -1)
      onChange?.(index)
    }

    return (
      <StackNavModal ref={ref} snapPoints={snapPoints} onChange={handleChange} {...restProps}>
        <Stack.Navigator screenOptions={modalScreenOptions}>
          <Stack.Screen name={bar ? bar.name : 'Bar Info'}>
            {(props) => (
              <BarHomeScreen {...props} bar={bar} onComplete={onComplete} onDelete={onDelete} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Edit Bar">
            {(props) => (
              <EditBarScreen {...props} bar={bar} onComplete={onComplete} isOpen={isOpen} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </StackNavModal>
    )
  },
)

MoreBarModal.displayName = 'MoreBarModal'

export default MoreBarModal
