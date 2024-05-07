import ModalBody from '@/components/_overlays/ModalBody'
import NewCollectionForm from '@/content/NewCollectionForm'
import { TCollection } from '@/lib/types/supabase'

interface INewCollectionScreen {
  onComplete?: () => void
  onAdd?: (collection: TCollection) => void
  isOpen?: boolean
}

const NewCollectionScreen = ({
  onComplete = () => {},
  onAdd = () => {},
  isOpen,
}: INewCollectionScreen) => {
  const handleComplete = (newCollection: TCollection) => {
    onAdd(newCollection)
  }

  if (!isOpen) {
    return null
  }

  return (
    <ModalBody>
      <NewCollectionForm onComplete={handleComplete} />
    </ModalBody>
  )
}

NewCollectionScreen.displayName = 'NewCollectionScreen'

export default NewCollectionScreen
