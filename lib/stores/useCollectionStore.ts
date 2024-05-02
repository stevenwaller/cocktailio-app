import { create } from 'zustand'

import { TCollection } from '@/lib/types/supabase'

interface ICollectionStore {
  collections: TCollection[]
  setCollections: (newCollections: TCollection[]) => void
  setCollection: (newCollection: TCollection) => void
}

const useCollectionStore = create<ICollectionStore>()((set) => ({
  collections: [],
  setCollections: (newCollections: TCollection[]) =>
    set((state) => {
      return { collections: newCollections }
    }),
  setCollection: (newCollection: TCollection) =>
    set((state) => {
      const newCollections = state.collections.map((collection) => {
        if (collection.id === newCollection.id) {
          return newCollection
        }
        return collection
      })

      return { collections: newCollections }
    }),
}))

export default useCollectionStore
