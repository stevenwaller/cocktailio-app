import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import BarStockNav from './BarStockNav'
import CocktailsNav from './CocktailsNav'
import CollectionsNav from './CollectionsNav'
import HomeNav from './HomeNav'

import BarStockIcon from '@/components/_icons/BarStock'
import CocktailsIcon from '@/components/_icons/Cocktails'
import CollectionsIcon from '@/components/_icons/Collections'
import DiscoverIcon from '@/components/_icons/Discover'
import { COLORS } from '@/lib/constants'

const Tab = createBottomTabNavigator()

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: COLORS.nav.inactive,
        tabBarActiveTintColor: '#3B1200',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.nav.bg,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <DiscoverIcon color={color} />,
        }}
        name="HomeNav"
        component={HomeNav}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Cocktails',
          tabBarIcon: ({ color }) => <CocktailsIcon color={color} />,
        }}
        name="CocktailsNav"
        component={CocktailsNav}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Bar Stock',
          tabBarIcon: ({ color }) => <BarStockIcon color={color} />,
        }}
        name="BarStockNav"
        component={BarStockNav}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Collections',
          tabBarIcon: ({ color }) => <CollectionsIcon color={color} />,
        }}
        name="CollectionsNav"
        component={CollectionsNav}
      />
    </Tab.Navigator>
  )
}

TabNav.displayName = 'TabNav'

export default TabNav
