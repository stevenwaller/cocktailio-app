import { ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native'

import { COLORS, FONTS, SIZE } from '@/lib/constants'

interface ButtonProps {
  style?: StyleProp<ViewStyle>
  label?: string
  children?: ReactNode
  slotLeft?: ReactNode
  slotRight?: ReactNode
  onPress?: () => void
}

const Button = ({
  style,
  slotLeft,
  slotRight,
  label,
  children,
  onPress,
  ...restProps
}: ButtonProps) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress} {...restProps}>
      {slotLeft && <View style={styles.slotLeft}>{slotLeft}</View>}
      <Text style={styles.label}>{label}</Text>
      {children}
      {slotRight && <View style={styles.slotRight}>{slotRight}</View>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.bg.action,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE.border.radius,
    paddingVertical: 7,
    paddingHorizontal: 11
  },
  label: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 14,
    color: COLORS.text.dark
  },
  slotLeft: {
    marginRight: 3,
    marginLeft: -3
  },
  slotRight: {
    marginLeft: 3,
    marginRight: -3
  }
})

Button.displayName = 'Button'

export default Button
