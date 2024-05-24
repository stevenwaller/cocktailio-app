import {
  BottomSheetScrollView,
  BottomSheetView,
  BottomSheetScrollableProps,
} from '@gorhom/bottom-sheet'
import { ReactNode } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'

import { COLORS } from '@/lib/constants'

interface ModalBodyProps extends BottomSheetScrollableProps {
  children: ReactNode
  style?: ViewStyle
}

const ModalBody = ({ children, style, ...restProps }: ModalBodyProps) => {
  return (
    <BottomSheetScrollView
      style={[styles.container, style]}
      enableFooterMarginAdjustment
      {...restProps}
    >
      <BottomSheetView style={styles.scrollContent}>{children}</BottomSheetView>
    </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg.level3,
  },
  scrollContent: {
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 20,
  },
})

ModalBody.displayName = 'ModalBody'

export default ModalBody
