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
      collection?: IFilterValue
      ingredient?: IFilterValue
      baseSpirit?: IFilterValue
      method?: IFilterValue
      era?: IFilterValue
      glass?: IFilterValue
      name?: string
    }
  | undefined

type CocktailDetailParams = { cocktailId: string; barId?: string; name: string }

type IngredientDetailParams = { ingredientId: string; barId?: string; name: string }

type SourceDetailParams = { sourceId: string; name: string }

type CocktailSearchParams = { barId?: string; collectionId?: string } | undefined

export type HomeStackParamList = {
  Home: undefined
  Cocktails: CocktailsParams
  'Search Cocktails': CocktailSearchParams
  Cocktail: CocktailDetailParams
  Ingredient: IngredientDetailParams
  Source: SourceDetailParams
}

export type CocktailsStackParamList = {
  Cocktails: CocktailsParams
  Cocktail: CocktailDetailParams
  Ingredient: IngredientDetailParams
  Source: SourceDetailParams
  'Search Cocktails': CocktailSearchParams
}

export type BarStockStackParamList = {
  'Bar Stock': undefined
  'Bar Ingredients': { barId: string }
  Bar: CocktailsParams
  Cocktails: CocktailsParams
  Cocktail: CocktailDetailParams
  Ingredient: IngredientDetailParams
  Source: SourceDetailParams
  'Search Ingredients': { barId: string }
  'Search Bar Cocktails': CocktailSearchParams
}

export type CollectionsStackParamList = {
  Collections: undefined
  Collection: CocktailsParams
  Cocktails: CocktailsParams
  Cocktail: CocktailDetailParams
  Ingredient: IngredientDetailParams
  Source: SourceDetailParams
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
}

export type SortableColumns = 'name' | 'created_at'
