import { PostgrestError } from '@supabase/supabase-js'
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react'

import { TIngredient } from '@/lib/types/supabase'
import supabaseClient from '@/lib/utils/supabaseClient'

export type TIngredientById = Record<string, TIngredient>

interface IIngredientContext {
  isFetching: boolean
  error: PostgrestError | null
  refetch: () => void
  init: () => void
  ingredientsById: TIngredientById
  ingredientCategoryIds: string[]
  baseSpiritIds: string[]
  baseSpirits: TIngredient[]
}

const IngredientsContext = createContext<IIngredientContext>({
  isFetching: false,
  error: null,
  refetch: () => {},
  init: () => {},
  ingredientsById: {},
  ingredientCategoryIds: [],
  baseSpiritIds: [],
  baseSpirits: [],
})

export const IngredientsProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [ingredientsById, setIngredientsById] = useState<TIngredientById>({})
  const [ingredientCategoryIds, setIngredientCategoryIds] = useState<string[]>([])
  const [baseSpiritIds, setBaseSpiritIds] = useState<string[]>([])
  const baseSpirits = useRef<TIngredient[]>([])
  const isFirstFetch = useRef(true)

  const fetchData = useCallback(async () => {
    isFirstFetch.current = false
    setIsFetching(true)

    const response = await supabaseClient
      .from('ingredients')
      .select(
        `
        *,
        childIngredientIds:ingredients(id)
        `,
      )
      .order('order')
      .order('name', { referencedTable: 'ingredients' })

    if (response.data) {
      const newIngredientsById: TIngredientById = {}
      const newIngredientCategoryIds: string[] = []
      const newBaseSpiritIds: string[] = []

      // normalize response data
      response.data.forEach((ingredient) => {
        newIngredientsById[ingredient.id] = ingredient

        // flatten the child ingredient id object
        newIngredientsById[ingredient.id].childIngredientIds = ingredient.childIngredientIds?.map(
          (item: any) => item.id,
        )

        // if the ingredient is a top level category
        // save it in the newIngredientCategoryIds
        // so we can build the ingredient tree starting with the categories
        if (!ingredient.parent_ingredient_id) {
          newIngredientCategoryIds.push(ingredient.id)
        }

        // if the ingredient is a base spirit
        // save it in the newBaseSpiritIds
        if (ingredient.is_base) {
          newBaseSpiritIds.push(ingredient.id)
        }
      })

      setIngredientsById(newIngredientsById)
      setIngredientCategoryIds(newIngredientCategoryIds)
      setBaseSpiritIds(newBaseSpiritIds)
    }
    setError(response.error)

    setIsFetching(false)
  }, [])

  const init = useCallback(() => {
    if (isFirstFetch.current) {
      fetchData()
    }
  }, [fetchData])

  useEffect(() => {
    if (baseSpiritIds.length > 0) {
      baseSpirits.current = baseSpiritIds.map((id) => ingredientsById[id])
    }
  }, [baseSpiritIds, ingredientsById])

  return (
    <IngredientsContext.Provider
      value={{
        isFetching,
        error,
        ingredientsById,
        ingredientCategoryIds,
        baseSpiritIds,
        baseSpirits: baseSpirits.current,
        refetch: fetchData,
        init,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  )
}

export const useIngredients = () => {
  const context = useContext(IngredientsContext)

  useEffect(() => {
    context.init()
    // This is intentional, we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return context
}
