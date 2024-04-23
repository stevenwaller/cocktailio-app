import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'

import CreateAccountScreen from './screens/CreateAccountScreen'
import SignInScreen from './screens/SignInScreen'

import { COLORS, FONTS } from '@/lib/constants'

const Stack = createStackNavigator()

const screenOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerMode: 'screen',
  headerShown: true,
  headerTintColor: COLORS.text.body,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: COLORS.bg.level2,
    borderTopWidth: 1,
    borderTopColor: COLORS.bg.level2,
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

interface AuthNavProps {
  onComplete: () => void
}

const AuthNav = ({ onComplete }: AuthNavProps) => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Create An Account">
        {(props) => <CreateAccountScreen {...props} onComplete={onComplete} />}
      </Stack.Screen>
      <Stack.Screen name="Sign In">
        {(props) => <SignInScreen {...props} onComplete={onComplete} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

AuthNav.displayName = 'AuthNav'

export default AuthNav
