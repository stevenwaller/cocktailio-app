import { StyleSheet, View, ViewProps } from 'react-native'

import { COLORS, SIZE } from '@/lib/constants'

export interface CardProps extends ViewProps {}

const Card = ({ children, style, ...restProps }: CardProps) => {
  return (
    <View style={[styles.card, style]} {...restProps}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bg.level3,
    borderRadius: SIZE.border.radius,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
    zIndex: 999,
  },
})

Card.displayName = 'Card'

export default Card
