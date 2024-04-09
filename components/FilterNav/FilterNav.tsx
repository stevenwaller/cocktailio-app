import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets
} from '@react-navigation/stack'

import BaseSpiritScreen from './screens/BaseSpiritScreen'
import FiltersScreen from './screens/FiltersScreen'
import InBarStockScreen from './screens/InBarStockScreen'

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
  headerTintColor: COLORS.nav.text,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: COLORS.nav.bg
  },
  headerTitleStyle: {
    fontFamily: FONTS.schotis.black
  },
  headerShadowVisible: false,
  headerStatusBarHeight: 0,
  headerBackTitleVisible: false,
  cardStyle: {
    backgroundColor: COLORS.bg.level3,
    overflow: 'visible'
  }
}

const filtersScreenOptions = { headerLeft: () => null }

const FilterNav = ({ currentFilterIndex, filters, onChange }: FilterNavProps) => {
  const currentFilter = currentFilterIndex !== undefined ? filters[currentFilterIndex] : undefined

  // TODO: render the screens dynamically instead of hard coding them
  const renderScreens = () => {
    if (currentFilter === undefined) {
      return (
        <>
          <Stack.Screen name="FILTERS" options={filtersScreenOptions}>
            {(props) => <FiltersScreen {...props} filters={filters} />}
          </Stack.Screen>
          <Stack.Screen name="IN BAR STOCK">
            {(props) => (
              <InBarStockScreen
                {...props}
                filter={filters.find((item) => item.name === 'In Bar Stock')}
                onChange={onChange}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="BASE SPIRIT">
            {(props) => (
              <BaseSpiritScreen
                {...props}
                filter={filters.find((item) => item.name === 'Base Spirit')}
                onChange={onChange}
              />
            )}
          </Stack.Screen>
        </>
      )
    }

    if (currentFilter?.name === 'In Bar Stock') {
      return (
        <Stack.Screen name="IN BAR STOCK">
          {(props) => <InBarStockScreen {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      )
    }

    if (currentFilter?.name === 'Base Spirit') {
      return (
        <Stack.Screen name="BASE SPIRIT">
          {(props) => <BaseSpiritScreen {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      )
    }
  }

  return <Stack.Navigator screenOptions={screenOptions}>{renderScreens()}</Stack.Navigator>
}

FilterNav.displayName = 'FilterNav'

export default FilterNav
