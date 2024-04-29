import { create } from 'zustand'

import { TEra } from '@/lib/types/supabase'

interface IEraStore {
  eras: TEra[]
  setEras: (newEras: TEra[]) => void
  setEra: (newEra: TEra) => void
}

const useEraStore = create<IEraStore>()((set) => ({
  eras: [],
  setEras: (newEras: TEra[]) =>
    set((state) => {
      return { eras: newEras }
    }),
  setEra: (newEra: TEra) =>
    set((state) => {
      const newEras = state.eras.map((era) => {
        if (era.id === newEra.id) {
          return newEra
        }
        return era
      })

      return { eras: newEras }
    }),
}))

export default useEraStore
