import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'

import BarIngredientsScreen from './BarIngredientsScreen'
import BarStockScreen from './BarStockScreen'
import CocktailDetailScreen from '../_sharedScreens/CocktailDetailScreen'
import CocktailsScreen from '../_sharedScreens/CocktailsScreen'
import IngredientDetailScreen from '../_sharedScreens/IngredientDetailScreen'
import SearchCocktailsScreen from '../_sharedScreens/SearchCocktailsScreen'
import SourceDetailScreen from '../_sharedScreens/SourceDetailScreen'

import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'
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
          name="Cocktails"
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('Search Cocktails')}>
                <SearchIcon color={COLORS.nav.text} />
              </Pressable>
            ),
          })}
          component={CocktailsScreen}
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