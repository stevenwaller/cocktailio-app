import { BottomSheetModal } from '@gorhom/bottom-sheet'
import type { User } from '@supabase/supabase-js'
import { createContext, useState, useEffect, useRef, ReactNode, useContext } from 'react'

import AuthNav from '@/components/AuthNav'
import StackNavModal from '@/components/_overlays/StackNavModal'
import supabaseClient from '@/lib/utils/supabaseClient'

const snapPoints = ['92%']

interface IAuthContext {
  user: User | null
  openAuthModal: () => void
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  openAuthModal: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthContextProviderProps {
  children: ReactNode
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const modalRef = useRef<BottomSheetModal>(null)

  const openAuthModal = () => {
    modalRef.current?.present()
  }

  const handleComplete = () => {
    modalRef.current?.dismiss()
  }

  useEffect(() => {
    const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
      } else if (session) {
        setUser(session.user)
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, openAuthModal }}>
      {children}
      <StackNavModal ref={modalRef} snapPoints={snapPoints}>
        <AuthNav onComplete={handleComplete} />
      </StackNavModal>
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
