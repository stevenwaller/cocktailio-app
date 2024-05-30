import ModalBody from '@/components/_overlays/ModalBody'
import NewBarForm from '@/content/NewBarForm'
import { TBar } from '@/lib/types/supabase'

interface INewBarScreen {
  onComplete?: () => void
  onAdd?: (bar: TBar) => void
  isOpen?: boolean
}

const NewBarScreen = ({ onComplete = () => {}, onAdd = () => {}, isOpen }: INewBarScreen) => {
  const handleComplete = (newBar: TBar) => {
    onAdd(newBar)
  }

  if (!isOpen) {
    return null
  }

  return (
    <ModalBody>
      <NewBarForm onComplete={handleComplete} />
    </ModalBody>
  )
}

NewBarScreen.displayName = 'NewBarScreen'

export default NewBarScreen
