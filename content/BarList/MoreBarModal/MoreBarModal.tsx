import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import { forwardRef, useState } from 'react'

import BarHomeScreen from './screens/BarHomeScreen'
import EditBarScreen from './screens/EditBarScreen'

import StackNavModal, {
  IStackNavModal,
  StackNavModalProps,
} from '@/components/_overlays/StackNavModal'
import { COLORS, FONTS } from '@/lib/constants'
import { TBar } from '@/lib/types/supabase'

interface MoreBarModalProps extends Omit<StackNavModalProps, 'children'> {
  bar?: TBar | null
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

const MoreBarModal = forwardRef<IStackNavModal, MoreBarModalProps>(
  ({ bar, onComplete = () => {}, onChange, ...restProps }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (index: number) => {
      setIsOpen(index !== -1)
      onChange?.(index)
    }

    return (
      <StackNavModal ref={ref} snapPoints={snapPoints} onChange={handleChange} {...restProps}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name={bar ? bar.name : 'Bar Info'}>
            {(props) => <BarHomeScreen {...props} bar={bar} onComplete={onComplete} />}
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
