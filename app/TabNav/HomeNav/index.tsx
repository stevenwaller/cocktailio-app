import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './HomeScreen'

import { HomeStackParamList } from '@/lib/types'
import { tabScreenOptions } from '@/lib/utils/options'

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeNav() {
  return (
    <HomeStack.Navigator screenOptions={tabScreenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  )
}
