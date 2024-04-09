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
  currentFilterName?: string
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

const FilterNav = ({ currentFilterName, filters, onChange }: FilterNavProps) => {
  const renderScreens = () => {
    if (currentFilterName === 'Filters') {
      return (
        <>
          <Stack.Screen name="FILTERS" options={filtersScreenOptions}>
            {(props) => <FiltersScreen {...props} filters={filters} />}
          </Stack.Screen>
          <Stack.Screen name="IN BAR STOCK">
            {(props) => <InBarStockScreen {...props} onChange={onChange} />}
          </Stack.Screen>
          <Stack.Screen name="BASE SPIRIT">
            {(props) => <BaseSpiritScreen {...props} onChange={onChange} />}
          </Stack.Screen>
        </>
      )
    }

    if (currentFilterName === 'In Bar Stock') {
      return (
        <Stack.Screen name="IN BAR STOCK">
          {(props) => <InBarStockScreen {...props} onChange={onChange} />}
        </Stack.Screen>
      )
    }

    if (currentFilterName === 'Base Spirit') {
      return (
        <Stack.Screen name="BASE SPIRIT">
          {(props) => <BaseSpiritScreen {...props} onChange={onChange} />}
        </Stack.Screen>
      )
    }
  }

  return <Stack.Navigator screenOptions={screenOptions}>{renderScreens()}</Stack.Navigator>
}

FilterNav.displayName = 'FilterNav'

export default FilterNav
