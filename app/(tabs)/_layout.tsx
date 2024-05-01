import { Tabs } from 'expo-router'

import BarStockIcon from '@/components/_icons/BarStock'
import CocktailsIcon from '@/components/_icons/Cocktails'
import DiscoverIcon from '@/components/_icons/Discover'
import SettingsIcon from '@/components/_icons/Settings'
import { COLORS } from '@/lib/constants'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: COLORS.nav.inactive,
        tabBarActiveTintColor: COLORS.nav.active,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.nav.bg,
          borderTopWidth: 0,
        },
      }}
      sceneContainerStyle={{ backgroundColor: COLORS.bg.level1 }}
    >
      <Tabs.Screen redirect name="index" />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => <DiscoverIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="cocktails"
        options={{
          title: 'Cocktails',
          tabBarIcon: ({ color }) => <CocktailsIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="barStock"
        options={{
          title: 'Bar Stock',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <BarStockIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
        }}
      />
    </Tabs>
  )
}
