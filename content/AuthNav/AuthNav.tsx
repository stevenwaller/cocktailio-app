import { createStackNavigator } from '@react-navigation/stack'

import CreateAccountScreen from './screens/CreateAccountScreen'
import SignInScreen from './screens/SignInScreen'

import { modalScreenOptions } from '@/lib/utils/options'

const Stack = createStackNavigator()

interface AuthNavProps {
  onComplete: () => void
}

const AuthNav = ({ onComplete }: AuthNavProps) => {
  return (
    <Stack.Navigator screenOptions={modalScreenOptions}>
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
