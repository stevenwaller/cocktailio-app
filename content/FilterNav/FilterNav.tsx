import { createStackNavigator } from '@react-navigation/stack'

import BaseSpiritScreen from './screens/BaseSpiritScreen'
import CollectionScreen from './screens/CollectionScreen'
import EraScreen from './screens/EraScreen'
import FiltersScreen from './screens/FiltersScreen'
import GlasswareScreen from './screens/GlasswareScreen'
import IngredientScreen from './screens/IngredientScreen'
import MethodScreen from './screens/MethodScreen'
import SearchIngredientsScreen from './screens/SearchIngredientsScreen'
import WithBarStockScreen from './screens/WithBarStockScreen'

import { IFilter, FilterNavStackParamList } from '@/lib/types'
import { modalScreenOptions } from '@/lib/utils/options'

interface FilterNavProps {
  currentFilterIndex?: number
  filters: IFilter[]
  onChange: (filter: IFilter) => void
}

const Components = {
  Filters: null,
  'Search Ingredients': SearchIngredientsScreen,
  'With Bar Stock': WithBarStockScreen,
  Collection: CollectionScreen,
  'Base Spirit': BaseSpiritScreen,
  Ingredient: IngredientScreen,
  Method: MethodScreen,
  Era: EraScreen,
  Glassware: GlasswareScreen,
}

const Stack = createStackNavigator<FilterNavStackParamList>()

const filtersScreenOptions = { headerLeft: () => null }

const FilterNav = ({ currentFilterIndex, filters, onChange }: FilterNavProps) => {
  const currentFilter = currentFilterIndex !== undefined ? filters[currentFilterIndex] : undefined
  const ingredientFilter = filters.find((item) => item.name === 'Ingredient')

  const renderIngredientSearch = () => {
    if (ingredientFilter) {
      return (
        <Stack.Screen name="Search Ingredients">
          {(props) => (
            <SearchIngredientsScreen {...props} filter={ingredientFilter} onChange={onChange} />
          )}
        </Stack.Screen>
      )
    }
  }

  const renderScreens = () => {
    if (currentFilter === undefined) {
      return (
        <>
          <Stack.Screen name="Filters" options={filtersScreenOptions}>
            {(props) => <FiltersScreen {...props} filters={filters} />}
          </Stack.Screen>
          {renderIngredientSearch()}
          {filters.map((filter) => {
            const ScreenComponent: any = Components[filter.name]

            return (
              <Stack.Screen key={filter.name} name={filter.name}>
                {(props) => (
                  <ScreenComponent
                    {...props}
                    filter={filters.find((item) => item.name === filter.name)}
                    onChange={onChange}
                  />
                )}
              </Stack.Screen>
            )
          })}
        </>
      )
    }

    const ScreenComponent: any = Components[currentFilter.name]

    return (
      <>
        <Stack.Screen name={currentFilter.name}>
          {(props) => <ScreenComponent {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
        {renderIngredientSearch()}
      </>
    )
  }

  return <Stack.Navigator screenOptions={modalScreenOptions}>{renderScreens()}</Stack.Navigator>
}

FilterNav.displayName = 'FilterNav'

export default FilterNav
