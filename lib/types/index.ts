export type TFilterName =
  | 'With Bar Stock'
  | 'Collection'
  | 'Base Spirit'
  | 'Ingredient'
  | 'Source'
  | 'Method'
  | 'Era'
  | 'Glassware'

export interface IFilter {
  name: TFilterName
  rowName?: string
  value: {
    id: string
    name: string
  }[]
}

type CocktailsParams =
  | {
      barId?: string
      collectionId?: string
      name?: string
    }
  | undefined

type CocktailDetailParams = { cocktailId: string; name: string }

type IngredientDetailParams = { ingredientId: string; name: string }

type SourceDetailParams = { sourceId: string; name: string }

export type HomeStackParamList = {
  Home: undefined
}

export type CocktailsStackParamList = {
  Cocktails: CocktailsParams
  Cocktail: CocktailDetailParams
  Ingredient: IngredientDetailParams
  'Source Detail': SourceDetailParams
  'Search Cocktails': undefined
}

export type BarStockStackParamList = {
  'Bar Stock': undefined
  'Bar Ingredients': { barId: string }
  Bar: CocktailsParams
  Cocktail: CocktailDetailParams
  Ingredient: IngredientDetailParams
  'Source Detail': SourceDetailParams
  'Search Cocktails': undefined
}

export type CollectionsStackParamList = {
  Collections: undefined
  Collection: CocktailsParams
  Cocktail: CocktailDetailParams
  Ingredient: IngredientDetailParams
  'Source Detail': SourceDetailParams
  'Search Cocktails': undefined
}

export type SettingsStackParamList = {
  Settings: undefined
}

export type SortableColumns = 'name' | 'created_at'
