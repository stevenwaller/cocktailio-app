import { Stack } from 'expo-router'
import { StyleSheet, ScrollView, Text } from 'react-native'

import PageContainer from '@/components/PageContainer'
import Button from '@/components/_inputs/Button'
import { COLORS, FONTS } from '@/lib/constants'
import { useAuth } from '@/lib/contexts/AuthContextProvider'
import supabaseClient from '@/lib/utils/supabaseClient'

export default function SettingsScreen() {
  const { user, openAuthModal } = useAuth()

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
          title: 'SETTINGS',
          headerTitleAlign: 'center',
        }}
      />
      <PageContainer>
        <Text style={styles.title}>Settings</Text>
        {user ? (
          <Button label="Log Out" onPress={handleSignOut} />
        ) : (
          <Button label="Log In / Create Account" onPress={() => openAuthModal()} />
        )}
      </PageContainer>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.serif.medium,
  },
})