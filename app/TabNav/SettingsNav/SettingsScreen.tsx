import { StyleSheet, ScrollView, Text } from 'react-native'

import PageContainer from '@/components/PageContainer'
import Button from '@/components/_inputs/Button'
import { COLORS, FONTS } from '@/lib/constants'
import { useAuthModal } from '@/lib/contexts/AuthModalContext'
import { useUser } from '@/lib/contexts/UserContext'
import supabaseClient from '@/lib/utils/supabaseClient'

export default function SettingsScreen() {
  const { openAuthModal } = useAuthModal()
  const { user } = useUser()

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      console.error('Error signing out:', error.message)
    }
  }

  return (
    <ScrollView>
      <PageContainer>
        <Text style={[styles.title, { marginBottom: 15 }]}>Account</Text>
        {user ? (
          <Button label="Sign Out" onPress={handleSignOut} />
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
