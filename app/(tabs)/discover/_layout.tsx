import { Stack } from 'expo-router'

import { FONTS, COLORS } from '@/lib/constants'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.nav.bg,
        },
        headerTintColor: COLORS.nav.text,
        headerTitleStyle: {
          fontFamily: FONTS.schotis.black,
        },
        contentStyle: { backgroundColor: COLORS.bg.level1 },
        headerBackTitleVisible: false,
      }}
    />
  )
}
