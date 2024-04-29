import { create } from 'zustand'

import { TSource } from '@/lib/types/supabase'

interface ISourceStore {
  sources: TSource[]
  setSources: (newSources: TSource[]) => void
  setSource: (newSource: TSource) => void
}

const useSourceStore = create<ISourceStore>()((set) => ({
  sources: [],
  setSources: (newSources: TSource[]) =>
    set((state) => {
      return { sources: newSources }
    }),
  setSource: (newSource: TSource) =>
    set((state) => {
      const newSources = state.sources.map((source) => {
        if (source.id === newSource.id) {
          return newSource
        }
        return source
      })

      return { sources: newSources }
    }),
}))

export default useSourceStore
