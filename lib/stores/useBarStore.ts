import { create } from 'zustand'

import { TBar } from '@/lib/types/supabase'

interface IBarStore {
  bars: TBar[]
  setBars: (newBars: TBar[]) => void
  setBar: (newBar: TBar) => void
}

const useBarStore = create<IBarStore>()((set) => ({
  bars: [],
  setBars: (newBars: TBar[]) =>
    set((state) => {
      return { bars: newBars }
    }),
  setBar: (newBar: TBar) =>
    set((state) => {
      const newBars = state.bars.map((bar) => {
        if (bar.id === newBar.id) {
          return newBar
        }
        return bar
      })

      return { bars: newBars }
    }),
}))

export default useBarStore
