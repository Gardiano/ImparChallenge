
export default interface PokemonsType {
  index: number
  id: number,
  arr?: [], 
  fn?: ( ) => void
  deleteFn: ( ) => void
  editFn: ( ) => void
  obj?: any
}