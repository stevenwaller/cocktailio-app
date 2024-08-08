import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CocktailsScreen from './CocktailsScreen'
import HomeScreen from './HomeScreen'
import SearchCocktailsScreen from './SearchCocktailsScreen'
import CocktailDetailScreen from '../_sharedScreens/CocktailDetailScreen'
import IngredientDetailScreen from '../_sharedScreens/IngredientDetailScreen'
import SourceDetailScreen from '../_sharedScreens/SourceDetailScreen'

import { ToastProvider } from '@/lib/contexts/ToastContext'
import { HomeStackParamList } from '@/lib/types'
import { tabScreenOptions } from '@/lib/utils/options'

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeNav() {
  return (
    <ToastProvider>
      <HomeStack.Navigator screenOptions={tabScreenOptions}>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Cocktails" component={CocktailsScreen} />
        <HomeStack.Screen name="Search Cocktails" component={SearchCocktailsScreen} />
        <HomeStack.Screen name="Cocktail" component={CocktailDetailScreen} />
        <HomeStack.Screen name="Ingredient" component={IngredientDetailScreen} />
        <HomeStack.Screen name="Source" component={SourceDetailScreen} />
      </HomeStack.Navigator>
    </ToastProvider>
  )
}
