import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Alert, StyleSheet, View, Text, TextInput } from 'react-native'

import Button from '@/components/_inputs/Button'
import Modal from '@/components/_overlays/Modal'
import { COLORS, FONTS } from '@/lib/constants'
import supabaseClient from '@/lib/utils/supabaseClient'

const snapPoints = ['92%']

const AuthModal = forwardRef<BottomSheetModal>((props, ref) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const modalRef = useRef<BottomSheetModal>(null)

  useImperativeHandle(ref, () => modalRef.current as BottomSheetModal)

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
      modalRef.current?.dismiss()
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
      modalRef.current?.dismiss()
    }
  }

  return (
    <Modal ref={modalRef} snapPoints={snapPoints}>
      <BottomSheetView style={styles.modalHeader}>
        <Text style={styles.modalHeaderText}>Account</Text>
      </BottomSheetView>
      <BottomSheetScrollView style={styles.scroller}>
        <BottomSheetView style={styles.scrollContent}>
          <View>
            <Text />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
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
              placeholder="Password"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formRow}>
            <Button label="Sign In" disabled={loading} onPress={() => signInWithEmail()} />
          </View>
          <View style={styles.formRow}>
            <Button label="Sign Up" disabled={loading} onPress={() => signUpWithEmail()} />
          </View>
        </BottomSheetView>
      </BottomSheetScrollView>
    </Modal>
  )
})

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderText: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.schotis.bold,
    paddingTop: 5,
    paddingBottom: 10,
  },
  scroller: {
    backgroundColor: COLORS.bg.level3,
  },
  scrollContent: {
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  formRow: {
    marginBottom: 20,
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
