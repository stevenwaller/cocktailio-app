import { ReactNode } from 'react'
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native'

import { SIZE } from '@/lib/constants'

interface PageContainerProps {
  style?: StyleProp<ViewStyle>
  children: ReactNode
}

const PageContainer = ({ style, children, ...restProps }: PageContainerProps) => (
  <View style={[styles.container, style]} {...restProps}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZE.app.paddingY,
    paddingLeft: SIZE.app.paddingX,
    paddingRight: SIZE.app.paddingX,
    paddingBottom: 40,
  },
})

PageContainer.displayName = 'PageContainer'

export default PageContainer
