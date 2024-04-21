import type { User } from '@supabase/supabase-js'
import { createContext, useState, useEffect, ReactNode, useContext } from 'react'

import supabaseClient from '@/lib/utils/supabaseClient'

interface IAuthContext {
  user: User | null
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
})

export const useAuth = () => useContext(AuthContext)

interface AuthContextProviderProps {
  children: ReactNode
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

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

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
