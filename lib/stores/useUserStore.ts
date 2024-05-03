import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'

export type TUser = User | null

interface IUserStore {
  user: TUser
  setUser: (newUser: TUser) => void
}

const useUserStore = create<IUserStore>()((set) => ({
  user: null,
  setUser: (newUser: TUser) =>
    set((state) => {
      return { user: newUser }
    }),
}))

export default useUserStore
