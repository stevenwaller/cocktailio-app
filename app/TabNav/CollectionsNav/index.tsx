import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CollectionDetailScreen from './CollectionDetailScreen'
import CollectionSearchCocktailsScreen from './CollectionSearchCocktailsScreen'
import CollectionsScreen from './CollectionsScreen'
import CocktailsHeaderBtns from '../_sharedHeaderBtns/CocktailsHeaderBtns'
import CocktailDetailScreen from '../_sharedScreens/CocktailDetailScreen'
import IngredientDetailScreen from '../_sharedScreens/IngredientDetailScreen'
import SourceDetailScreen from '../_sharedScreens/SourceDetailScreen'

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
            headerRight: () => <CocktailsHeaderBtns onMorePress={() => {}} />,
          })}
          component={CollectionDetailScreen}
        />
        <CollectionsStack.Screen name="Cocktail" component={CocktailDetailScreen} />
        <CollectionsStack.Screen
          name="Search Collection Cocktails"
          component={CollectionSearchCocktailsScreen}
        />
        <CollectionsStack.Screen name="Ingredient" component={IngredientDetailScreen} />
        <CollectionsStack.Screen
          name="Source Detail"
          component={SourceDetailScreen}
          options={{ title: '' }}
        />
      </CollectionsStack.Navigator>
    </ToastProvider>
  )
}
