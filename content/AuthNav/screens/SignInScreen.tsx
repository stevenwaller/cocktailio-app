import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, StyleSheet, View, Alert, TouchableWithoutFeedback } from 'react-native'

import FormField from '@/components/_forms/FormField'
import Button from '@/components/_inputs/Button'
import TextInput from '@/components/_inputs/TextInput'
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
    if (!email || !password) return Alert.alert('Please enter your email and password')

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
        <FormField label="Email">
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
            readOnly={loading}
          />
        </FormField>
        <FormField label="Password">
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            autoCapitalize="none"
            readOnly={loading}
          />
        </FormField>
        <Button label="Sign In" loading={loading} onPress={() => signInWithEmail()} />
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
})

SignIn.displayName = 'SignIn'

export default SignIn
