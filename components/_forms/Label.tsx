import { Text, TextProps, StyleSheet } from 'react-native'

import { COLORS, FONTS } from '@/lib/constants'

const Label = ({ children, style, ...restProps }: TextProps) => (
  <Text style={[styles.label, style]} {...restProps}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: FONTS.hells.sans.bold,
    color: COLORS.text.body,
  },
})

Label.displayName = 'Label'

export default Label
