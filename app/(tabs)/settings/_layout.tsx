import { Stack } from 'expo-router'

import { tabScreenOptions } from '@/lib/utils/options'

export default function Layout() {
  return <Stack screenOptions={tabScreenOptions} />
}
