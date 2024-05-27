import { createStackNavigator } from '@react-navigation/stack'
import { forwardRef, useState } from 'react'

import CollectionHomeScreen from './screens/CollectionHomeScreen'
import EditCollectionScreen from './screens/EditCollectionScreen'

import StackNavModal, {
  IStackNavModal,
  StackNavModalProps,
} from '@/components/_overlays/StackNavModal'
import { TCollection } from '@/lib/types/supabase'
import { modalScreenOptions } from '@/lib/utils/options'

export interface IMoreCollectionModal extends IStackNavModal {}

interface MoreCollectionModalProps extends Omit<StackNavModalProps, 'children'> {
  collection?: TCollection | null
  onComplete?: () => void
  onDelete?: () => void
}

const snapPoints = ['32%']

const Stack = createStackNavigator()

const MoreCollectionModal = forwardRef<IStackNavModal, MoreCollectionModalProps>(
  ({ collection, onComplete = () => {}, onDelete = () => {}, onChange, ...restProps }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (index: number) => {
      setIsOpen(index !== -1)
      onChange?.(index)
    }

    return (
      <StackNavModal ref={ref} snapPoints={snapPoints} onChange={handleChange} {...restProps}>
        <Stack.Navigator screenOptions={modalScreenOptions}>
          <Stack.Screen name={collection ? collection.name : 'Collection Info'}>
            {(props) => (
              <CollectionHomeScreen
                {...props}
                collection={collection}
                onComplete={onComplete}
                onDelete={onDelete}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Edit Collection">
            {(props) => (
              <EditCollectionScreen
                {...props}
                collection={collection}
                onComplete={onComplete}
                isOpen={isOpen}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </StackNavModal>
    )
  },
)

MoreCollectionModal.displayName = 'MoreCollectionModal'

export default MoreCollectionModal
