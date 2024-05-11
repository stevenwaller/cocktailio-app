import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CocktailsNav from './CocktailsNav'
import HomeNav from './HomeNav'

import CocktailsIcon from '@/components/_icons/Cocktails'
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
    </Tab.Navigator>
  )
}

TabNav.displayName = 'TabNav'

export default TabNav
