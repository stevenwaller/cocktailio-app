import { Stack } from 'expo-router'

import { ToastProvider } from '@/lib/contexts/ToastContext'
import { tabScreenOptions } from '@/lib/utils/options'

export default function Layout() {
  return (
    <ToastProvider>
      <Stack screenOptions={tabScreenOptions} />
    </ToastProvider>
  )
}
