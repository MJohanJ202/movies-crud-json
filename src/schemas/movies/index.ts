import z from 'zod'

const movieSchema = z.object({
  title: z.string().min(3).max(1000),
  year: z.number().int().positive().min(1900).max(new Date().getFullYear() + 1),
  director: z.string().min(3).max(100),
  duration: z.number().int().positive().min(30).max(1000),
  poster: z.string().url(),
  genre: z.enum(['action', 'comedy', 'drama', 'horror', 'sci-fi', 'thriller', 'adventure', 'romance', 'biography', 'history'])
    .array(),
  rate: z.number().min(0).max(10).default(4.5)
})

const idSchema = z.string().uuid()

const transformGenreToLowerCase = (shape: any) => {
  if (!('genre' in shape)) return shape
  const genre = shape.genre.map((value: string) => value.toLowerCase())
  return { ...shape, genre }
}

export const validatePostMovie = (shape: unknown) => {
  const transform = transformGenreToLowerCase(shape)
  return movieSchema.safeParse(transform)
}

export const validateUpdateMovie = (shape: unknown) => {
  const transform = transformGenreToLowerCase(shape)
  return movieSchema.partial().safeParse(transform)
}

export const validateId = (shape: unknown) => {
  return idSchema.safeParse(shape)
}
