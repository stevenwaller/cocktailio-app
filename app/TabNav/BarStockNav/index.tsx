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
import { BarStockStackParamList } from '@/lib/types'
import { tabScreenOptions } from '@/lib/utils/options'

const CocktailsStack = createNativeStackNavigator<BarStockStackParamList>()

export default function BarStockNav() {
  return (
    <CocktailsStack.Navigator screenOptions={tabScreenOptions}>
      <CocktailsStack.Screen name="Bar Stock" component={BarStockScreen} />
      <CocktailsStack.Screen name="Bar Ingredients" component={BarIngredientsScreen} />
      <CocktailsStack.Screen
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
      <CocktailsStack.Screen name="Cocktail Detail" component={CocktailDetailScreen} />
      <CocktailsStack.Screen name="Search Cocktails" component={SearchCocktailsScreen} />
      <CocktailsStack.Screen
        name="Ingredient Detail"
        component={IngredientDetailScreen}
        options={{ title: '' }}
      />
      <CocktailsStack.Screen
        name="Source Detail"
        component={SourceDetailScreen}
        options={{ title: '' }}
      />
    </CocktailsStack.Navigator>
  )
}
