import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

import { COLORS, SIZE } from '@/lib/constants'

interface CardHeaderProps {
  children: ReactNode
}

const CardHeader = ({ children, ...restProps }: CardHeaderProps) => {
  return (
    <View style={styles.header} {...restProps}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    width: '100%',
    borderTopStartRadius: SIZE.border.radius,
    borderTopEndRadius: SIZE.border.radius,
    backgroundColor: COLORS.bg.level2,
    paddingTop: 8,
    paddingRight: SIZE.card.paddingX,
    paddingBottom: 10,
    paddingLeft: SIZE.card.paddingX
  }
})

CardHeader.displayName = 'CardHeader'

export default CardHeader
