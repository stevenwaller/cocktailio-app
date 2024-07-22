export type TFilterName = keyof FilterNavStackParamList

export interface IFilterValue {
  id: string
  name: string
}

export interface IFilter {
  name: TFilterName
  rowName?: string
  value: IFilterValue[]
}

type CocktailsParams =
  | {
      barId?: string
      collectionId?: string
      ingredientId?: string
      name?: string
    }
  | undefined

type CocktailDetailParams = { cocktailId: string; barId?: string; name: string }

type IngredientDetailParams = { ingredientId: string; barId?: string; name: string }

type SourceDetailParams = { sourceId: string; name: string }

type CocktailSearchParams = { barId?: string; collectionId?: string } | undefined

export type HomeStackParamList = {
  Home: undefined
}

export type CocktailsStackParamList = {
  Cocktails: CocktailsParams
  Cocktail: CocktailDetailParams
  Ingredient: IngredientDetailParams
  'Source Detail': SourceDetailParams
  'Search Cocktails': CocktailSearchParams
}

export type BarStockStackParamList = {
  'Bar Stock': undefined
  'Bar Ingredients': { barId: string }
  Bar: CocktailsParams
  Cocktails: CocktailsParams
  Cocktail: CocktailDetailParams
  Ingredient: IngredientDetailParams
  'Source Detail': SourceDetailParams
  'Search Ingredients': { barId: string }
  'Search Bar Cocktails': CocktailSearchParams
}

export type CollectionsStackParamList = {
  Collections: undefined
  Collection: CocktailsParams
  Cocktails: CocktailsParams
  Cocktail: CocktailDetailParams
  Ingredient: IngredientDetailParams
  'Source Detail': SourceDetailParams
  'Search Collection Cocktails': CocktailSearchParams
}

export type SettingsStackParamList = {
  Settings: undefined
}

export type FilterNavStackParamList = {
  Filters: undefined
  'With Bar Stock': undefined
  Collection: undefined
  'Base Spirit': undefined
  Ingredient: undefined
  Method: undefined
  Era: undefined
  Glassware: undefined
  'Search Ingredients': undefined
}

export type SortableColumns = 'name' | 'created_at'
