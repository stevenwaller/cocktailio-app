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
    paddingTop: 16,
    paddingRight: SIZE.card.paddingX,
    paddingBottom: 16,
    paddingLeft: SIZE.card.paddingX
  }
})

CardBody.displayName = 'CardBody'

export default CardBody
