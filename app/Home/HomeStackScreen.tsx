import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DetailsScreen from './DetailsScreen'
import HomeScreen from './HomeScreen'

import { HomeStackParamList } from '@/lib/types'
import { tabScreenOptions } from '@/lib/utils/options'

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={tabScreenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  )
}

HomeStackScreen.displayName = 'HomeStackScreen'

export default HomeStackScreen
