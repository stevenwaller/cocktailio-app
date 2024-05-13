export interface IFilter {
  index: number
  name: string
  value: {
    id: string
    name: string
  }[]
}

export type HomeStackParamList = {
  Home: undefined
}

export type CocktailsStackParamList = {
  Cocktails: { barId?: string; collectionId?: string; name?: string } | undefined
  'Cocktail Detail': { cocktailId: string; name: string } | undefined
  'Ingredient Detail': { ingredientId: string; name: string } | undefined
  'Source Detail': { sourceId: string; name: string } | undefined
  'Search Cocktails': undefined
}
