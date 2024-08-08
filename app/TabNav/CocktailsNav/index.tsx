import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CocktailsScreen from './CocktailsScreen'
import SearchCocktailsScreen from './SearchCocktailsScreen'
import CocktailHeaderBtns from '../_sharedHeaderBtns/CocktailHeaderBtns'
import CocktailsHeaderBtns from '../_sharedHeaderBtns/CocktailsHeaderBtns'
import CocktailDetailScreen from '../_sharedScreens/CocktailDetailScreen'
import IngredientDetailScreen from '../_sharedScreens/IngredientDetailScreen'
import SourceDetailScreen from '../_sharedScreens/SourceDetailScreen'

import { ToastProvider } from '@/lib/contexts/ToastContext'
import { CocktailsStackParamList } from '@/lib/types'
import { tabScreenOptions } from '@/lib/utils/options'

const CocktailsStack = createNativeStackNavigator<CocktailsStackParamList>()

export default function CocktailsNav() {
  return (
    <ToastProvider>
      <CocktailsStack.Navigator screenOptions={tabScreenOptions}>
        <CocktailsStack.Screen
          name="Cocktails"
          options={({ navigation }) => ({
            headerRight: () => <CocktailsHeaderBtns />,
          })}
          component={CocktailsScreen}
        />
        <CocktailsStack.Screen
          name="Cocktail"
          component={CocktailDetailScreen}
          options={() => ({
            headerRight: () => <CocktailHeaderBtns />,
          })}
        />
        <CocktailsStack.Screen name="Search Cocktails" component={SearchCocktailsScreen} />
        <CocktailsStack.Screen name="Ingredient" component={IngredientDetailScreen} />
        <CocktailsStack.Screen name="Source" component={SourceDetailScreen} />
      </CocktailsStack.Navigator>
    </ToastProvider>
  )
}
