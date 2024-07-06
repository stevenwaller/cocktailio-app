import type { User } from '@supabase/supabase-js'
import { createContext, useEffect, ReactNode, useContext, useState } from 'react'

import supabaseClient from '@/lib/utils/supabaseClient'

interface IUserContext {
  user: User | null
}

export const UserContext = createContext<IUserContext>({
  user: null,
})

interface UserContextProps {
  children: ReactNode
}

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    console.log('auth context change')
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
  }, [setUser])

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
