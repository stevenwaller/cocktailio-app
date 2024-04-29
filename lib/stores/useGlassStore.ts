import { create } from 'zustand'

import { TGlass } from '@/lib/types/supabase'

interface IGlassStore {
  glasses: TGlass[]
  setGlasses: (newGlasses: TGlass[]) => void
  setGlass: (newGlass: TGlass) => void
}

const useGlassStore = create<IGlassStore>()((set) => ({
  glasses: [],
  setGlasses: (newGlasses: TGlass[]) =>
    set((state) => {
      return { glasses: newGlasses }
    }),
  setGlass: (newGlass: TGlass) =>
    set((state) => {
      const newGlasses = state.glasses.map((glass) => {
        if (glass.id === newGlass.id) {
          return newGlass
        }
        return glass
      })

      return { glasses: newGlasses }
    }),
}))

export default useGlassStore
