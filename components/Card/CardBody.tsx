import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

import { SIZE } from '@/lib/constants'

interface CardBodyProps {
  children: ReactNode
}

const CardBody = ({ children, ...restProps }: CardBodyProps) => {
  return (
    <View style={styles.body} {...restProps}>
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
