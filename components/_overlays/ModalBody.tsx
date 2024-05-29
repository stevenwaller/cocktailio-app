import {
  BottomSheetScrollView,
  BottomSheetView,
  BottomSheetScrollableProps,
} from '@gorhom/bottom-sheet'
import { ReactNode } from 'react'
import { StyleSheet, ViewStyle, KeyboardAvoidingView } from 'react-native'

import { COLORS } from '@/lib/constants'

interface ModalBodyProps extends BottomSheetScrollableProps {
  children: ReactNode
  scrollViewStyle?: ViewStyle
  contentStyle?: ViewStyle
}

const ModalBody = ({ children, scrollViewStyle, contentStyle, ...restProps }: ModalBodyProps) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={60}>
      <BottomSheetScrollView
        style={[styles.container, scrollViewStyle]}
        enableFooterMarginAdjustment
        {...restProps}
      >
        <BottomSheetView style={[styles.scrollContent, contentStyle]}>{children}</BottomSheetView>
      </BottomSheetScrollView>
    </KeyboardAvoidingView>
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
