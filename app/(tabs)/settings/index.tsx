import { Stack } from 'expo-router'
import { StyleSheet, ScrollView, Text } from 'react-native'

import PageContainer from '@/components/PageContainer'
import Button from '@/components/_inputs/Button'
import { COLORS, FONTS } from '@/lib/constants'
import { useAuth } from '@/lib/contexts/AuthContextProvider'
import useUserStore from '@/lib/stores/useUserStore'
import supabaseClient from '@/lib/utils/supabaseClient'

export default function SettingsScreen() {
  const { openAuthModal } = useAuth()
  const { user } = useUserStore()

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      console.error('Error signing out:', error.message)
    }
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerTitleAlign: 'center',
        }}
      />
      <PageContainer>
        <Text style={[styles.title, { marginBottom: 15 }]}>Account</Text>
        {user ? (
          <Button label="Log Out" onPress={handleSignOut} />
        ) : (
          <Button label="Create a free account / Sign in" onPress={() => openAuthModal()} />
        )}
      </PageContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.schotis.semiBold,
  },
})
