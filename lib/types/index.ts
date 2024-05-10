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
  Details: undefined
}
