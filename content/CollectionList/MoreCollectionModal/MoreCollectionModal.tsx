import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import { forwardRef, useState } from 'react'

import CollectionHomeScreen from './screens/CollectionHomeScreen'
import EditCollectionScreen from './screens/EditCollectionScreen'

import StackNavModal, {
  IStackNavModal,
  StackNavModalProps,
} from '@/components/_overlays/StackNavModal'
import { COLORS, FONTS } from '@/lib/constants'
import { TCollection } from '@/lib/types/supabase'

interface MoreCollectionModalProps extends Omit<StackNavModalProps, 'children'> {
  collection?: TCollection | null
  onComplete?: () => void
}

const snapPoints = ['32%']

const Stack = createStackNavigator()

const screenOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerMode: 'screen',
  headerShown: true,
  headerTintColor: COLORS.text.body,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: COLORS.bg.level2,
  },
  headerTitleStyle: {
    fontFamily: FONTS.schotis.bold,
    fontSize: 20,
  },
  headerShadowVisible: false,
  headerStatusBarHeight: 0,
  headerBackTitleVisible: false,
  cardStyle: {
    backgroundColor: COLORS.bg.level3,
    overflow: 'visible',
  },
}

const MoreCollectionModal = forwardRef<IStackNavModal, MoreCollectionModalProps>(
  ({ collection, onComplete = () => {}, onChange, ...restProps }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (index: number) => {
      setIsOpen(index !== -1)
      onChange?.(index)
    }

    return (
      <StackNavModal ref={ref} snapPoints={snapPoints} onChange={handleChange} {...restProps}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name={collection ? collection.name : 'Collection Info'}>
            {(props) => (
              <CollectionHomeScreen {...props} collection={collection} onComplete={onComplete} />
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
