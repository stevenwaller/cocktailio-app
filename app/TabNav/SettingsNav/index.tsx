import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SettingsScreen from './SettingsScreen'

import { SettingsStackParamList } from '@/lib/types'
import { tabScreenOptions } from '@/lib/utils/options'

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>()

export default function HomeNav() {
  return (
    <SettingsStack.Navigator screenOptions={tabScreenOptions}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}
