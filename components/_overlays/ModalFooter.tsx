import { BottomSheetFooter, BottomSheetFooterProps } from '@gorhom/bottom-sheet'
import { ReactNode } from 'react'
import { Platform, StyleSheet, ViewStyle } from 'react-native'

import { COLORS, SIZE } from '@/lib/constants'

interface IModalFooterProps extends BottomSheetFooterProps {
  style?: ViewStyle
  children: ReactNode
}

const ModalFooter = ({ style, children, ...restProps }: IModalFooterProps) => {
  return (
    <BottomSheetFooter style={{ ...styles.modalFooter, ...style }} {...restProps}>
      {children}
    </BottomSheetFooter>
  )
}

const styles = StyleSheet.create({
  modalFooter: {
    backgroundColor: COLORS.bg.level2,
    paddingHorizontal: SIZE.card.paddingX,
    paddingVertical: SIZE.card.paddingY,
    paddingBottom: Platform.OS === 'ios' ? 35 : 15,
  },
})

ModalFooter.displayName = 'ModalFooter'

export default ModalFooter
