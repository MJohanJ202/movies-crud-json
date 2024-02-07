export type uuid = `${string}-${string}-${string}-${string}-${string}`
export type movie = {
  id: uuid
  title: string
  year: number
  director: string
  duration: number
  poster: string
  genre: string[],
  rate: number
}

export type dtoCreateMovie = {
  title: string
  year: number
  director: string
  duration: number
  poster: string
  genre: string[],
  rate: number
}

export type dtoUpdateMovie = Partial<dtoCreateMovie>
