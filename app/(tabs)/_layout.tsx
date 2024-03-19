import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'

import BarStockIcon from '@/components/_icons/BarStock'
import CocktailsIcon from '@/components/_icons/Cocktails'
import DiscoverIcon from '@/components/_icons/Discover'
import SettingsIcon from '@/components/_icons/Settings'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { COLORS } from '@/lib/constants'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.nav.text,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true)
      }}
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
