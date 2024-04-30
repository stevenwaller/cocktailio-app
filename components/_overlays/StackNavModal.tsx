import { NavigationContainer } from '@react-navigation/native'
import { forwardRef } from 'react'

import Modal, { IModalProps, IModal } from '@/components/_overlays/Modal'

export interface IStackNavModal extends IModal {}

const StackNavModal = forwardRef<IModal, IModalProps>(({ children, ...restProps }, ref) => {
  return (
    <Modal ref={ref} {...restProps}>
      <NavigationContainer independent>{children}</NavigationContainer>
    </Modal>
  )
})

StackNavModal.displayName = 'StackNavModal'

export default StackNavModal
