import { StyleSheet, View, ViewProps } from 'react-native'

import { SIZE } from '@/lib/constants'

export interface CardBodyProps extends ViewProps {}

const CardBody = ({ children, style, ...restProps }: CardBodyProps) => {
  return (
    <View style={[styles.body, style]} {...restProps}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    // width: '100%',
    paddingTop: SIZE.card.paddingY,
    paddingRight: SIZE.card.paddingX,
    paddingBottom: SIZE.card.paddingY,
    paddingLeft: SIZE.card.paddingX,
  },
})

CardBody.displayName = 'CardBody'

export default CardBody
