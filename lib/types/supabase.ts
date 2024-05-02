import { Tables } from './supabaseGenerated'

export type TEra = Tables<'eras'>

export type TGlass = Tables<'glasses'>

export type TCocktail = Tables<'cocktails'> & {
  base_ingredient: Tables<'ingredients'>
  glass: TGlass
  era: TEra
  method: TMethod
  steps: Tables<'cocktail_steps'>[] | null
  sources:
    | (Tables<'cocktail_sources'> &
        {
          id: string
          source: Tables<'sources'>
        }[])
    | null
  components: IComponent[] | null
}

export type IComponent = Tables<'cocktail_components'> & {
  id: string
  measurement: Tables<'measurements'>
  ingredients: TComponentIngredient[]
  or_ingredients: TComponentIngredient[]
  pref_ingredients: TComponentIngredient[]
}

export type TComponentIngredient = Tables<'cocktail_component_ingredients'> & {
  id: string
  ingredient: TIngredient
}

export type TIngredient = Tables<'ingredients'> & {
  ingredients?: TIngredient[]
}

export type TSource = Tables<'sources'>

export type TIngredientsById = Record<string, TIngredient>

export type TBar = Tables<'bars'> & {
  bar_ingredients: TBarIngredient[]
  ingredientsById: TIngredientsById
}

export type TBarIngredient = Tables<'bar_ingredients'> & {
  ingredient: TIngredient
}

export type TMethod = Tables<'methods'>

export type TCollection = Tables<'collections'>
