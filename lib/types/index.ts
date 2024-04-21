export interface IFilter {
  index: number
  name: string
  screen: string
  key: string
  value: {
    id: string
    name: string
  }[]
  // value: {
  //   [key: string]: string
  // }
}
