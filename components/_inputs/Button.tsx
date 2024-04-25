import { ReactNode } from 'react'
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native'

import { COLORS, FONTS, SIZE } from '@/lib/constants'

interface ButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>
  label?: string
  children?: ReactNode
  slotLeft?: ReactNode
  slotRight?: ReactNode
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  onPress?: () => void
}

const Button = ({
  style,
  slotLeft,
  slotRight,
  label,
  children,
  onPress,
  loading,
  size = 'medium',
  ...restProps
}: ButtonProps) => {
  const renderContent = () => {
    if (loading) {
      return <Text style={[styles.label, styles[`label_${size}`]]}>Loading...</Text>
    } else {
      return (
        <>
          {slotLeft && <View style={styles.slotLeft}>{slotLeft}</View>}
          <Text style={[styles.label, styles[`label_${size}`]]}>{label}</Text>
          {children}
          {slotRight && <View style={styles.slotRight}>{slotRight}</View>}
        </>
      )
    }
  }

  return (
    <Pressable
      style={[styles.button, styles[`button_${size}`], style]}
      onPress={onPress}
      {...restProps}
    >
      {renderContent()}
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
  },
  button_small: {
    paddingVertical: 7,
    paddingHorizontal: 11,
  },
  button_medium: {
    paddingVertical: 10,
    paddingHorizontal: 11,
  },
  button_large: {
    paddingVertical: 20,
    paddingHorizontal: 11,
  },
  label: {
    color: COLORS.text.dark,
  },
  label_small: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 14,
  },
  label_medium: {
    fontFamily: FONTS.hells.sans.bold,
    fontSize: 16,
  },
  label_large: {
    fontFamily: FONTS.hells.sans.bold,
    fontSize: 16,
  },
  slotLeft: {
    marginRight: 3,
    marginLeft: -3,
  },
  slotRight: {
    marginLeft: 3,
    marginRight: -3,
  },
})

Button.displayName = 'Button'

export default Button
