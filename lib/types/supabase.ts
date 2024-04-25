import { Tables } from './supabaseGenerated'

export type TCocktail = Tables<'cocktails'> & {
  base_ingredient: Tables<'ingredients'>
  glass: Tables<'glasses'>
  era: Tables<'eras'>
  method: Tables<'methods'>
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

export type TIngredient = Tables<'ingredients'>

export type TSource = Tables<'sources'>

export type TBar = Tables<'bars'> & {
  ingredients: TBarIngredient[]
}

export type TBarIngredient = Tables<'bar_ingredients'> & {
  ingredient: TIngredient
}
