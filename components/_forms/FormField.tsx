import { View, ViewProps, StyleSheet } from 'react-native'

import Label from '@/components/_forms/Label'
import { SIZE } from '@/lib/constants'

interface FormFieldProps extends ViewProps {
  label: string
}

const FormField = ({ label, children, style, ...restProps }: FormFieldProps) => (
  <View style={[styles.formField, style]} {...restProps}>
    <Label style={styles.label}>{label}</Label>
    {children}
  </View>
)

const styles = StyleSheet.create({
  label: {
    marginBottom: SIZE.form.labelMargin,
  },
  formField: {
    marginBottom: SIZE.form.rowMargin,
  },
})

FormField.displayName = 'FormField'

export default FormField
