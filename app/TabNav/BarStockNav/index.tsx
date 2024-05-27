import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'

import BarDetailScreen from './BarDetailScreen'
import BarIngredientsScreen from './BarIngredientsScreen'
import BarStockScreen from './BarStockScreen'
import BarHeaderBtns from '../_sharedHeaderBtns/BarHeaderBtns'
import CocktailDetailScreen from '../_sharedScreens/CocktailDetailScreen'
import IngredientDetailScreen from '../_sharedScreens/IngredientDetailScreen'
import SearchCocktailsScreen from '../_sharedScreens/SearchCocktailsScreen'
import SourceDetailScreen from '../_sharedScreens/SourceDetailScreen'

import { ToastProvider } from '@/lib/contexts/ToastContext'
import { BarStockStackParamList } from '@/lib/types'
import { tabScreenOptions } from '@/lib/utils/options'

const BarStockStack = createNativeStackNavigator<BarStockStackParamList>()

export default function BarStockNav() {
  return (
    <ToastProvider>
      <BarStockStack.Navigator screenOptions={tabScreenOptions}>
        <BarStockStack.Screen name="Bar Stock" component={BarStockScreen} />
        <BarStockStack.Screen name="Bar Ingredients" component={BarIngredientsScreen} />
        <BarStockStack.Screen
          name="Bar"
          options={() => ({
            headerRight: () => <BarHeaderBtns />,
          })}
          component={BarDetailScreen}
        />
        <BarStockStack.Screen name="Cocktail Detail" component={CocktailDetailScreen} />
        <BarStockStack.Screen name="Search Cocktails" component={SearchCocktailsScreen} />
        <BarStockStack.Screen
          name="Ingredient Detail"
          component={IngredientDetailScreen}
          options={{ title: '' }}
        />
        <BarStockStack.Screen
          name="Source Detail"
          component={SourceDetailScreen}
          options={{ title: '' }}
        />
      </BarStockStack.Navigator>
    </ToastProvider>
  )
}
