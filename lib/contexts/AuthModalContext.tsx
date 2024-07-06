import { createContext, useRef, ReactNode, useContext } from 'react'

import StackNavModal, { IStackNavModal } from '@/components/_overlays/StackNavModal'
import AuthNav from '@/content/AuthNav'

const snapPoints = ['92%']

interface IAuthModalContext {
  openAuthModal: () => void
}

export const AuthModalContext = createContext<IAuthModalContext>({
  openAuthModal: () => {},
})

interface AuthModalContextProps {
  children: ReactNode
}

export const AuthModalContextProvider = ({ children }: AuthModalContextProps) => {
  const modalRef = useRef<IStackNavModal>(null)

  const openAuthModal = () => {
    modalRef.current?.present()
  }

  const handleComplete = () => {
    modalRef.current?.dismiss()
  }

  return (
    <AuthModalContext.Provider value={{ openAuthModal }}>
      {children}
      <StackNavModal ref={modalRef} snapPoints={snapPoints}>
        <AuthNav onComplete={handleComplete} />
      </StackNavModal>
    </AuthModalContext.Provider>
  )
}

export const useAuthModal = () => useContext(AuthModalContext)
