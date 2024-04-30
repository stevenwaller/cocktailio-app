import { View, ViewProps, StyleSheet } from 'react-native'

import { SIZE } from '@/lib/constants'

const FormRow = ({ children, style, ...restProps }: ViewProps) => (
  <View style={[styles.formRow, style]} {...restProps}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  formRow: {
    marginBottom: SIZE.form.rowMargin,
  },
})

FormRow.displayName = 'FormRow'

export default FormRow
