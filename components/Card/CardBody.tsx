import { StyleSheet, View, ViewProps } from 'react-native'

import { SIZE } from '@/lib/constants'

const CardBody = ({ children, style, ...restProps }: ViewProps) => {
  return (
    <View style={[styles.body, style]} {...restProps}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    width: '100%',
    paddingTop: SIZE.card.paddingY,
    paddingRight: SIZE.card.paddingX,
    paddingBottom: SIZE.card.paddingY,
    paddingLeft: SIZE.card.paddingX,
  },
})

CardBody.displayName = 'CardBody'

export default CardBody
