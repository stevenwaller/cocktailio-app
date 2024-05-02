import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'

import BaseSpiritScreen from './screens/BaseSpiritScreen'
import CollectionScreen from './screens/CollectionScreen'
import EraScreen from './screens/EraScreen'
import FiltersScreen from './screens/FiltersScreen'
import GlasswareScreen from './screens/GlasswareScreen'
import IngredientScreen from './screens/IngredientScreen'
import MethodScreen from './screens/MethodScreen'
import SourceScreen from './screens/SourceScreen'
import WithBarStockScreen from './screens/WithBarStockScreen'

import { COLORS, FONTS } from '@/lib/constants'
import { IFilter } from '@/lib/types'

interface FilterNavProps {
  currentFilterIndex?: number
  filters: IFilter[]
  onChange: (filter: IFilter) => void
}

const Stack = createStackNavigator()

const screenOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerMode: 'screen',
  headerShown: true,
  headerTintColor: COLORS.text.body,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: COLORS.bg.level2,
  },
  headerTitleStyle: {
    fontFamily: FONTS.schotis.bold,
    fontSize: 20,
  },
  headerShadowVisible: false,
  headerStatusBarHeight: 0,
  headerBackTitleVisible: false,
  cardStyle: {
    backgroundColor: COLORS.bg.level3,
    overflow: 'visible',
  },
}

const filtersScreenOptions = { headerLeft: () => null }

const FilterNav = ({ currentFilterIndex, filters, onChange }: FilterNavProps) => {
  const currentFilter = currentFilterIndex !== undefined ? filters[currentFilterIndex] : undefined

  // TODO: render the screens dynamically instead of hard coding them
  const renderScreens = () => {
    if (currentFilter === undefined) {
      return (
        <>
          <Stack.Screen name="Filters" options={filtersScreenOptions}>
            {(props) => <FiltersScreen {...props} filters={filters} />}
          </Stack.Screen>
          <Stack.Screen name="With Bar Stock">
            {(props) => (
              <WithBarStockScreen
                {...props}
                filter={filters.find((item) => item.name === 'With Bar Stock')}
                onChange={onChange}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Collection">
            {(props) => (
              <CollectionScreen
                {...props}
                filter={filters.find((item) => item.name === 'Collection')}
                onChange={onChange}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Base Spirit">
            {(props) => (
              <BaseSpiritScreen
                {...props}
                filter={filters.find((item) => item.name === 'Base Spirit')}
                onChange={onChange}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Ingredient">
            {(props) => (
              <IngredientScreen
                {...props}
                filter={filters.find((item) => item.name === 'Ingredient')}
                onChange={onChange}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Sources">
            {(props) => (
              <SourceScreen
                {...props}
                filter={filters.find((item) => item.name === 'Source')}
                onChange={onChange}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Method">
            {(props) => (
              <MethodScreen
                {...props}
                filter={filters.find((item) => item.name === 'Method')}
                onChange={onChange}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Era">
            {(props) => (
              <EraScreen
                {...props}
                filter={filters.find((item) => item.name === 'Era')}
                onChange={onChange}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Glassware">
            {(props) => (
              <GlasswareScreen
                {...props}
                filter={filters.find((item) => item.name === 'Glassware')}
                onChange={onChange}
              />
            )}
          </Stack.Screen>
        </>
      )
    }

    if (currentFilter?.name === 'With Bar Stock') {
      return (
        <Stack.Screen name="With Bar Stock">
          {(props) => <WithBarStockScreen {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      )
    }

    if (currentFilter?.name === 'Collection') {
      return (
        <Stack.Screen name="Collection">
          {(props) => <CollectionScreen {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      )
    }

    if (currentFilter?.name === 'Base Spirit') {
      return (
        <Stack.Screen name="Base Spirit">
          {(props) => <BaseSpiritScreen {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      )
    }

    if (currentFilter?.name === 'Ingredient') {
      return (
        <Stack.Screen name="Ingredient">
          {(props) => <IngredientScreen {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      )
    }

    if (currentFilter?.name === 'Source') {
      return (
        <Stack.Screen name="Source">
          {(props) => <SourceScreen {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      )
    }

    if (currentFilter?.name === 'Method') {
      return (
        <Stack.Screen name="Method">
          {(props) => <MethodScreen {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      )
    }

    if (currentFilter?.name === 'Era') {
      return (
        <Stack.Screen name="Era">
          {(props) => <EraScreen {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      )
    }

    if (currentFilter?.name === 'Glassware') {
      return (
        <Stack.Screen name="Glassware">
          {(props) => <GlasswareScreen {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      )
    }
  }

  return <Stack.Navigator screenOptions={screenOptions}>{renderScreens()}</Stack.Navigator>
}

FilterNav.displayName = 'FilterNav'

export default FilterNav
