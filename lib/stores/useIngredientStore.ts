import { create } from 'zustand'

import { TIngredient } from '@/lib/types/supabase'

interface IIngredientStore {
  ingredients: TIngredient[]
  setIngredients: (newIngredients: TIngredient[]) => void
  setIngredient: (newIngredient: TIngredient) => void
}

const useIngredientStore = create<IIngredientStore>()((set) => ({
  ingredients: [],
  setIngredients: (newIngredients: TIngredient[]) =>
    set((state) => {
      return { ingredients: newIngredients }
    }),
  setIngredient: (newIngredient: TIngredient) =>
    set((state) => {
      const newIngredients = state.ingredients.map((ingredient) => {
        if (ingredient.id === newIngredient.id) {
          return newIngredient
        }
        return ingredient
      })

      return { ingredients: newIngredients }
    }),
}))

export default useIngredientStore
