import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { TextInputProps, StyleSheet } from 'react-native'

import { COLORS } from '@/lib/constants'

const TextInput = ({ style, ...restProps }: TextInputProps) => (
  <BottomSheetTextInput style={[styles.input, style]} {...restProps} />
)

const styles = StyleSheet.create({
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

TextInput.displayName = 'TextInput'

export default TextInput
