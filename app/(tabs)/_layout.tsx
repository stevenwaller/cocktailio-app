import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'

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
          backgroundColor: COLORS.nav.bg
        }
      }}
      sceneContainerStyle={{ backgroundColor: COLORS.bg.level1 }}
    >
      <Tabs.Screen redirect name="index" />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => <DiscoverIcon color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <SettingsIcon
                    color={COLORS.nav.text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="cocktails"
        options={{
          title: 'Cocktails',
          tabBarIcon: ({ color }) => <CocktailsIcon color={color} />
        }}
      />
      <Tabs.Screen
        name="barStock"
        options={{
          title: 'Bar Stock',
          tabBarIcon: ({ color }) => <BarStockIcon color={color} />
        }}
      />
    </Tabs>
  )
}
