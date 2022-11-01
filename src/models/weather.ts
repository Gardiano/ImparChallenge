
export type WeatherTypes = {
  id: number,
  name: string
  state: string
  temperature: number
  humidity: number
  condition: string
  sensation: number
  wind_velocity: number
  fn: ( ) => void
}