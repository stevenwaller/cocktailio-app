import { ReactNode } from 'react'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'

import { COLORS, SIZE } from '@/lib/constants'

interface CardProps {
  style?: StyleProp<ViewStyle>
  children: ReactNode
}

const Card = ({ children, style, ...restProps }: CardProps) => {
  return (
    <View style={[styles.card, style]} {...restProps}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: COLORS.bg.level3,
    borderRadius: SIZE.border.radius,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 40
  }
})

Card.displayName = 'Card'

export default Card
