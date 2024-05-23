export interface IFilter {
  index: number
  name: string
  value: {
    id: string
    name: string
  }[]
}

type CocktailsParams =
  | {
      type?: 'Bar' | 'Collection'
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
  'Cocktail Detail': CocktailDetailParams
  'Ingredient Detail': IngredientDetailParams
  'Source Detail': SourceDetailParams
  'Search Cocktails': undefined
}

export type BarStockStackParamList = {
  'Bar Stock': undefined
  'Bar Ingredients': { barId: string }
  Cocktails: CocktailsParams
  'Cocktail Detail': CocktailDetailParams
  'Ingredient Detail': IngredientDetailParams
  'Source Detail': SourceDetailParams
  'Search Cocktails': undefined
}

export type CollectionsStackParamList = {
  Collections: undefined
  Cocktails: CocktailsParams
  'Cocktail Detail': CocktailDetailParams
  'Ingredient Detail': IngredientDetailParams
  'Source Detail': SourceDetailParams
  'Search Cocktails': undefined
}

export type SettingsStackParamList = {
  Settings: undefined
}
