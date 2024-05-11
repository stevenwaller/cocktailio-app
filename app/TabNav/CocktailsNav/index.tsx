import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'

import CocktailDetailScreen from '../_sharedScreens/CocktailDetailScreen'
import CocktailsScreen from '../_sharedScreens/CocktailsScreen'

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
        options={{
          headerRight: () => (
            <Pressable>
              <SearchIcon color={COLORS.nav.text} />
            </Pressable>
          ),
        }}
        component={CocktailsScreen}
      />
      <CocktailsStack.Screen name="Cocktail Detail" component={CocktailDetailScreen} />
    </CocktailsStack.Navigator>
  )
}

CocktailsNav.displayName = 'CocktailsNav'

export default CocktailsNav
