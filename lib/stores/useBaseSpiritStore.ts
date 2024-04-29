import { create } from 'zustand'

import { TIngredient } from '@/lib/types/supabase'

interface IBaseSpiritStore {
  spirits: TIngredient[]
  setSpirits: (newSpirits: TIngredient[]) => void
  setSpirit: (newSpirit: TIngredient) => void
}

const useBaseSpiritStore = create<IBaseSpiritStore>()((set) => ({
  spirits: [],
  setSpirits: (newSpirits: TIngredient[]) =>
    set((state) => {
      return { spirits: newSpirits }
    }),
  setSpirit: (newSpirit: TIngredient) =>
    set((state) => {
      const newSpirits = state.spirits.map((spirit) => {
        if (spirit.id === newSpirit.id) {
          return newSpirit
        }
        return spirit
      })

      return { spirits: newSpirits }
    }),
}))

export default useBaseSpiritStore
