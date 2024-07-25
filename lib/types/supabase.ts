import { Tables } from './supabaseGenerated'

export type TEra = Tables<'eras'>

export type TGlass = Tables<'glasses'>

export type TRelatedCocktail = Tables<'cocktail_related_cocktails'>

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
  optional_components: IComponent[] | null
  related_cocktails: TRelatedCocktail[] | null
}

export type IComponent = Tables<'cocktail_components'> & {
  id: string
  measurement: Tables<'measurements'>
  ingredients: TComponentIngredient[]
  or_ingredients: TComponentIngredient[]
  recommended_ingredients: TComponentIngredient[]
}

export type TComponentIngredient = Tables<'cocktail_component_ingredients'> & {
  id: string
  cocktail_component_id: string
  ingredient_id: string
  type: 'Default' | 'Or' | 'Recommended'
}

export type TIngredient = Omit<Tables<'ingredients'>, 'hierarchy'> & {
  hierarchy: { id: string; name: string }[] | null
  childIngredientIds?: string[]
}

export type TSource = Tables<'sources'>

export type TIngredientsById = Record<string, string>

export type TBar = Omit<Tables<'bars'>, 'ingredients_by_id' | 'all_ingredients_by_id'> & {
  bar_ingredients: TBarIngredient[]
  all_ingredients_by_id: TIngredientsById
  ingredients_by_id: TIngredientsById
  cocktail_count: number
}

export type TBarIngredient = Tables<'bar_ingredients'>

export type TMethod = Tables<'methods'>

export type TCollectionCocktail = Tables<'collection_cocktails'>

export type TCocktailIdsById = Record<string, string>

export type TCollection = Tables<'collections'> & {
  collection_cocktails: TCollectionCocktail[]
  cocktail_ids_by_id: TCocktailIdsById
  cocktail_ids: string[]
}
