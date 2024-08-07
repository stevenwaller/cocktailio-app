import { createStackNavigator } from '@react-navigation/stack'

import BaseSpiritScreen from './screens/BaseSpiritScreen'
import CollectionScreen from './screens/CollectionScreen'
import EraScreen from './screens/EraScreen'
import FilterHeaderBtns from './screens/FilterHeaderBtns'
import FiltersScreen from './screens/FiltersScreen'
import GlasswareScreen from './screens/GlasswareScreen'
import IngredientScreen from './screens/IngredientScreen'
import MethodScreen from './screens/MethodScreen'
import WithBarStockScreen from './screens/WithBarStockScreen'

import { IFilter, FilterNavStackParamList } from '@/lib/types'
import { modalScreenOptions } from '@/lib/utils/options'

interface FilterNavProps {
  currentFilterIndex?: number
  filters: IFilter[]
  onChange: (filter: IFilter) => void
  onResetAll: () => void
}

const Components = {
  Filters: null,
  'With Bar Stock': WithBarStockScreen,
  Collection: CollectionScreen,
  'Base Spirit': BaseSpiritScreen,
  Ingredient: IngredientScreen,
  Method: MethodScreen,
  Era: EraScreen,
  Glassware: GlasswareScreen,
}

const Stack = createStackNavigator<FilterNavStackParamList>()

const FilterNav = ({ currentFilterIndex, filters, onChange, onResetAll }: FilterNavProps) => {
  const currentFilter = currentFilterIndex !== undefined ? filters[currentFilterIndex] : undefined

  const renderScreens = () => {
    if (currentFilter === undefined) {
      return (
        <>
          <Stack.Screen
            name="Filters"
            options={() => ({
              headerLeft: () => null,
              headerRight: () => <FilterHeaderBtns resetAll onReset={onResetAll} />,
            })}
          >
            {(props) => <FiltersScreen {...props} filters={filters} />}
          </Stack.Screen>
          {filters.map((filter) => {
            const ScreenComponent: any = Components[filter.name]

            return (
              <Stack.Screen
                key={filter.name}
                name={filter.name}
                options={() => ({
                  headerRight: () => (
                    <FilterHeaderBtns
                      onReset={() => {
                        if (!filter) return
                        onChange({ ...filter, value: [] })
                      }}
                    />
                  ),
                })}
              >
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
        <Stack.Screen
          name={currentFilter.name}
          options={() => ({
            headerRight: () => (
              <FilterHeaderBtns
                onReset={() => {
                  if (!currentFilter) return
                  onChange({ ...currentFilter, value: [] })
                }}
              />
            ),
          })}
        >
          {(props) => <ScreenComponent {...props} filter={currentFilter} onChange={onChange} />}
        </Stack.Screen>
      </>
    )
  }

  return <Stack.Navigator screenOptions={modalScreenOptions}>{renderScreens()}</Stack.Navigator>
}

FilterNav.displayName = 'FilterNav'

export default FilterNav
