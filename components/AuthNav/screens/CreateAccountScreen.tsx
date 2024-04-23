import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, StyleSheet, View, Alert, TextInput, TouchableWithoutFeedback } from 'react-native'

import Button from '@/components/_inputs/Button'
import { COLORS, FONTS } from '@/lib/constants'
import supabaseClient from '@/lib/utils/supabaseClient'

interface ICreateAccountScreenProps {
  onComplete: () => void
}

const CreateAccountScreen = ({ onComplete }: ICreateAccountScreenProps) => {
  const { navigate } = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

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
      onComplete()
    }
  }

  return (
    <BottomSheetScrollView style={styles.container} enableFooterMarginAdjustment>
      <BottomSheetView style={styles.scrollContent}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Already have an account?{' '}
            <TouchableWithoutFeedback onPress={() => navigate('Sign In' as never)}>
              <Text style={[styles.descriptionText, styles.descriptionLink]}>Sign in</Text>
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
          />
        </View>
        <View style={styles.formRow}>
          <Button label="Create Account" disabled={loading} onPress={() => signUpWithEmail()} />
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
    marginBottom: 5,
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

CreateAccountScreen.displayName = 'CreateAccountScreen'

export default CreateAccountScreen
