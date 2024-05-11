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
  Cocktails: undefined
  'Cocktail Detail': { cocktailId: string; name: string }
}
