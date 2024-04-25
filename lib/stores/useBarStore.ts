import { create } from 'zustand'

import { TBar } from '@/lib/types/supabase'

type TBarsById = Record<string, TBar>

interface IBarStore {
  bars: TBar[]
  barsById: TBarsById
  setBars: (newBars: TBar[]) => void
  setBarsById: (newBars: TBarsById) => void
}

const useBarStore = create<IBarStore>()((set) => ({
  bars: [],
  barsById: {},
  setBars: (newBars: TBar[]) =>
    set((state) => {
      return { bars: newBars }
    }),
  setBarsById: (newBars: TBarsById) =>
    set((state) => {
      return { barsById: newBars }
    }),
}))

export default useBarStore
