import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'

import CocktailDetailScreen from '../_sharedScreens/CocktailDetailScreen'
import CocktailsScreen from '../_sharedScreens/CocktailsScreen'
import IngredientDetailScreen from '../_sharedScreens/IngredientDetailScreen'
import SearchCocktailsScreen from '../_sharedScreens/SearchCocktailsScreen'

import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'
import { CocktailsStackParamList } from '@/lib/types'
import { tabScreenOptions } from '@/lib/utils/options'

const CocktailsStack = createNativeStackNavigator<CocktailsStackParamList>()

const CocktailsNav = () => {
  return (
    <CocktailsStack.Navigator screenOptions={tabScreenOptions}>
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
    </CocktailsStack.Navigator>
  )
}

CocktailsNav.displayName = 'CocktailsNav'

export default CocktailsNav
