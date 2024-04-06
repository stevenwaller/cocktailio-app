import { Tables } from './supabaseGenerated'

export type TCocktail = Tables<'cocktails'> & {
  base_ingredient: Tables<'ingredients'>
  glass: Tables<'glasses'>
  era: Tables<'eras'>
  method: Tables<'methods'>
  steps: Tables<'cocktail_steps'>[]
  sources: Tables<'sources'>[]
  components: Tables<'cocktail_components'> &
    {
      measurement: Tables<'measurements'>
      ingredients: Tables<'cocktail_component_ingredients'> &
        {
          ingredient: Tables<'ingredients'>
        }[]
      or_ingredients: Tables<'cocktail_component_or_ingredients'> &
        {
          ingredient: Tables<'ingredients'>
        }[]
      pref_ingredients: Tables<'cocktail_component_pref_ingredients'> &
        {
          ingredient: Tables<'ingredients'>
        }[]
    }[]
}

export type TIngredient = Tables<'cocktail_component_ingredients'>
