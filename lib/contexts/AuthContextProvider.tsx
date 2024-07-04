import { createContext, useEffect, useRef, ReactNode, useContext } from 'react'

import useCollectionStore from '../stores/useCollectionStore'

import StackNavModal, { IStackNavModal } from '@/components/_overlays/StackNavModal'
import AuthNav from '@/content/AuthNav'
import { useBars } from '@/lib/contexts/BarsContext'
import useUserStore from '@/lib/stores/useUserStore'
import supabaseClient from '@/lib/utils/supabaseClient'

const snapPoints = ['92%']

interface IAuthContext {
  openAuthModal: () => void
}

export const AuthContext = createContext<IAuthContext>({
  openAuthModal: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthContextProviderProps {
  children: ReactNode
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { setUser } = useUserStore()
  const { setCollections } = useCollectionStore()
  const { reset } = useBars()
  const modalRef = useRef<IStackNavModal>(null)

  const openAuthModal = () => {
    modalRef.current?.present()
  }

  const handleComplete = () => {
    modalRef.current?.dismiss()
  }

  useEffect(() => {
    console.log('auth context change')
    const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
        setCollections([])
        reset()
      } else if (session) {
        setUser(session.user)
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [reset, setCollections, setUser])

  return (
    <AuthContext.Provider value={{ openAuthModal }}>
      {children}
      <StackNavModal ref={modalRef} snapPoints={snapPoints}>
        <AuthNav onComplete={handleComplete} />
      </StackNavModal>
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
