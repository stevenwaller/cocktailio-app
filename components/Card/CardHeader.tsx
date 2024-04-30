import { StyleSheet, View, ViewProps } from 'react-native'

import { COLORS, SIZE, FONTS } from '@/lib/constants'

export interface CardHeaderProps extends ViewProps {
  isBody?: boolean
}

const CardHeader = ({ isBody, children, style, ...restProps }: CardHeaderProps) => {
  return (
    <View style={[styles.header, !isBody && styles.isTop, style]} {...restProps}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.bg.level2,
    paddingTop: 8,
    paddingRight: SIZE.card.paddingX,
    paddingBottom: 10,
    paddingLeft: SIZE.card.paddingX,
    fontSize: 20,
    color: COLORS.text.link,
    fontFamily: FONTS.schotis.bold,
  },
  isTop: {
    borderTopStartRadius: SIZE.border.radius,
    borderTopEndRadius: SIZE.border.radius,
  },
})

CardHeader.displayName = 'CardHeader'

export default CardHeader
