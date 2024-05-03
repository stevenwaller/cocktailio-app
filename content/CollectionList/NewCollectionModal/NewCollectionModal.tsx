import { forwardRef, useState } from 'react'

import Modal, { IModal, IModalProps } from '@/components/_overlays/Modal'
import ModalBody from '@/components/_overlays/ModalBody'
import ModalHeader from '@/components/_overlays/ModalHeader'
import NewCollectionForm from '@/content/NewCollectionForm'

interface NewCollectionModalProps extends Omit<IModalProps, 'children'> {
  onComplete?: () => void
}

const snapPoints = ['32%']

const NewCollectionModal = forwardRef<IModal, NewCollectionModalProps>(
  ({ onComplete = () => {}, onChange, ...restProps }, ref) => {
    const [isClosed, setIsClosed] = useState(false)

    const handleChange = (index: number) => {
      if (index === -1) {
        setIsClosed(true)
      }
      onChange?.(index)
    }

    return (
      <Modal ref={ref} snapPoints={snapPoints} onChange={handleChange} {...restProps}>
        <ModalHeader title="Create new collection" />
        <ModalBody>{!isClosed && <NewCollectionForm onComplete={onComplete} />}</ModalBody>
      </Modal>
    )
  },
)

NewCollectionModal.displayName = 'NewCollectionModal'

export default NewCollectionModal
