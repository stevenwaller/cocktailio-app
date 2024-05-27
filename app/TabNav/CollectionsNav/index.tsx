import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'

import CollectionDetailScreen from './CollectionDetailScreen'
import CollectionsScreen from './CollectionsScreen'
import CollectionHeaderBtns from '../_sharedHeaderBtns/CollectionHeaderBtns'
import CocktailDetailScreen from '../_sharedScreens/CocktailDetailScreen'
import IngredientDetailScreen from '../_sharedScreens/IngredientDetailScreen'
import SearchCocktailsScreen from '../_sharedScreens/SearchCocktailsScreen'
import SourceDetailScreen from '../_sharedScreens/SourceDetailScreen'

import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'
import { ToastProvider } from '@/lib/contexts/ToastContext'
import { CollectionsStackParamList } from '@/lib/types'
import { tabScreenOptions } from '@/lib/utils/options'

const CollectionsStack = createNativeStackNavigator<CollectionsStackParamList>()

export default function CollectionsNav() {
  return (
    <ToastProvider>
      <CollectionsStack.Navigator screenOptions={tabScreenOptions}>
        <CollectionsStack.Screen name="Collections" component={CollectionsScreen} />
        <CollectionsStack.Screen
          name="Collection"
          options={() => ({
            headerRight: () => <CollectionHeaderBtns />,
          })}
          component={CollectionDetailScreen}
        />
        <CollectionsStack.Screen name="Cocktail Detail" component={CocktailDetailScreen} />
        <CollectionsStack.Screen name="Search Cocktails" component={SearchCocktailsScreen} />
        <CollectionsStack.Screen
          name="Ingredient Detail"
          component={IngredientDetailScreen}
          options={{ title: '' }}
        />
        <CollectionsStack.Screen
          name="Source Detail"
          component={SourceDetailScreen}
          options={{ title: '' }}
        />
      </CollectionsStack.Navigator>
    </ToastProvider>
  )
}
