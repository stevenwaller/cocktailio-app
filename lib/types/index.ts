export interface IFilter {
  index: number
  name: string
  value: {
    id: string
    name: string
  }[]
  // value: {
  //   [key: string]: string
  // }
}
