import { create } from 'zustand'

import { TMethod } from '@/lib/types/supabase'

interface IMethodStore {
  methods: TMethod[]
  setMethods: (newMethods: TMethod[]) => void
  setMethod: (newMethod: TMethod) => void
}

const useMethodStore = create<IMethodStore>()((set) => ({
  methods: [],
  setMethods: (newMethods: TMethod[]) =>
    set((state) => {
      return { methods: newMethods }
    }),
  setMethod: (newMethod: TMethod) =>
    set((state) => {
      const newMethods = state.methods.map((method) => {
        if (method.id === newMethod.id) {
          return newMethod
        }
        return method
      })

      return { methods: newMethods }
    }),
}))

export default useMethodStore
