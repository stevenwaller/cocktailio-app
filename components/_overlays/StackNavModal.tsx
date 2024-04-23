import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { forwardRef } from 'react'

import Modal, { IModalProps } from '@/components/_overlays/Modal'

const StackNavModal = forwardRef<BottomSheetModal, IModalProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <Modal ref={ref} {...restProps}>
        <NavigationContainer independent>{children}</NavigationContainer>
      </Modal>
    )
  },
)

StackNavModal.displayName = 'StackNavModal'

export default StackNavModal
