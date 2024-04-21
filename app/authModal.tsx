import { Stack, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text, TextInput } from 'react-native'

import PageContainer from '@/components/PageContainer'
import Button from '@/components/_inputs/Button'
import { COLORS, FONTS } from '@/lib/constants'
import supabaseClient from '@/lib/utils/supabaseClient'

const AuthModal = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      Alert.alert(error.message)
    } else {
      router.dismiss()
    }
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      Alert.alert(error.message)
    } else {
      router.dismiss()
    }
  }

  return (
    <PageContainer>
      <Stack.Screen
        options={{
          title: 'Log In / Create Account',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.nav.bg,
          },
          headerTintColor: COLORS.nav.text,
          headerTitleStyle: {
            fontFamily: FONTS.schotis.black,
          },
        }}
      />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button label="Sign In" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button label="Sign Up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: FONTS.hells.sans.medium,
    color: COLORS.text.body,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.bg.level2,
    backgroundColor: COLORS.bg.level2,
    borderRadius: 6,
    fontSize: 16,
    color: COLORS.text.body,
  },
})

AuthModal.displayName = 'AuthModal'

export default AuthModal
