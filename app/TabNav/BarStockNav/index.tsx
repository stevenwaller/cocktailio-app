import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BarDetailScreen from './BarDetailScreen'
import BarIngredientsScreen from './BarIngredientsScreen'
import BarSearchCocktailsScreen from './BarSearchCocktailsScreen'
import BarStockScreen from './BarStockScreen'
import CocktailsHeaderBtns from '../_sharedHeaderBtns/CocktailsHeaderBtns'
import CocktailDetailScreen from '../_sharedScreens/CocktailDetailScreen'
import CocktailsScreen from '../_sharedScreens/CocktailsScreen'
import IngredientDetailScreen from '../_sharedScreens/IngredientDetailScreen'
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
            headerRight: () => <CocktailsHeaderBtns onMorePress={() => {}} />,
          })}
          component={BarDetailScreen}
        />
        <BarStockStack.Screen name="Search Bar Cocktails" component={BarSearchCocktailsScreen} />
        <BarStockStack.Screen name="Cocktails" component={CocktailsScreen} />
        <BarStockStack.Screen name="Cocktail" component={CocktailDetailScreen} />
        <BarStockStack.Screen name="Ingredient" component={IngredientDetailScreen} />
        <BarStockStack.Screen name="Source" component={SourceDetailScreen} />
      </BarStockStack.Navigator>
    </ToastProvider>
  )
}
