import { Tables } from './supabaseGenerated'

export type TCocktails = Tables<'cocktails'> & {
  base_ingredient: Tables<'ingredients'>
  recipes: Tables<'recipes'> &
    {
      steps: Tables<'recipe_steps'>[]
      source: Tables<'sources'>[]
      components: Tables<'recipe_components'> &
        {
          measurement: Tables<'measurements'>[]
          ingredient: Tables<'recipe_component_ingredients'>[]
          or_ingredient: Tables<'recipe_component_or_ingredients'>[]
          pref_ingredient: Tables<'recipe_component_pref_ingredients'>[]
        }[]
    }[]
}
