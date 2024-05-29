import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'

import CocktailsScreen from './CocktailsScreen'
import CocktailHeaderBtns from '../_sharedHeaderBtns/CocktailHeaderBtns'
import CocktailDetailScreen from '../_sharedScreens/CocktailDetailScreen'
import IngredientDetailScreen from '../_sharedScreens/IngredientDetailScreen'
import SearchCocktailsScreen from '../_sharedScreens/SearchCocktailsScreen'
import SourceDetailScreen from '../_sharedScreens/SourceDetailScreen'

import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'
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
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('Search Cocktails')}>
                <SearchIcon color={COLORS.nav.text} />
              </Pressable>
            ),
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
    </ToastProvider>
  )
}
