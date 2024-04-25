import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, StyleSheet, View, Alert, TextInput, TouchableWithoutFeedback } from 'react-native'

import Button from '@/components/_inputs/Button'
import { COLORS, FONTS } from '@/lib/constants'
import supabaseClient from '@/lib/utils/supabaseClient'

interface ISignInProps {
  onComplete: () => void
}

const SignIn = ({ onComplete }: ISignInProps) => {
  const { navigate } = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

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
      onComplete()
    }
  }

  return (
    <BottomSheetScrollView style={styles.container} enableFooterMarginAdjustment>
      <BottomSheetView style={styles.scrollContent}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Don't have an account?{' '}
            <TouchableWithoutFeedback onPress={() => navigate('Create An Account' as never)}>
              <Text style={[styles.descriptionText, styles.descriptionLink]}>
                Create an account
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
            readOnly={loading}
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            autoCapitalize="none"
            readOnly={loading}
          />
        </View>
        <View style={styles.formRow}>
          <Button label="Sign In" loading={loading} onPress={() => signInWithEmail()} />
        </View>
      </BottomSheetView>
    </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg.level3,
  },
  scrollContent: {
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  description: {
    marginBottom: 20,
  },
  descriptionText: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 16,
    color: COLORS.text.body,
  },
  descriptionLink: {
    color: COLORS.text.link,
    fontFamily: FONTS.hells.sans.bold,
  },
  formRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: FONTS.hells.sans.bold,
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

SignIn.displayName = 'SignIn'

export default SignIn
