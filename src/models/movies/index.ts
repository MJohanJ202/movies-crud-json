import { dtoCreateMovie, dtoUpdateMovie, movie, uuid } from '../../consts'
import { movies, writeMoviesFile } from '../../database'

export class ModelMovies {

  async findAll() {
    return movies
  }

  async findById(id: uuid) {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  async find({ queryName, queryValue }: { queryName: string, queryValue: unknown }) {
    if (queryName == "genre" && typeof queryValue == "string") {
      const searchGenre = (genre: string) => {
        return genre.toLowerCase() === queryValue.toLowerCase()
      }
      const genreFilteredMovies = movies
        .filter(movie => movie.genre.some(searchGenre))
      return genreFilteredMovies
    }

    const moviesByQuery = movies
      .filter(movie => movie[queryName as keyof movie] === queryValue)
    return moviesByQuery
  }

  async create(movie: dtoCreateMovie) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...movie
    }
    movies.push(newMovie)

    await writeMoviesFile(movies)
    return [newMovie.id]
  }

  async update(id: uuid, movie: dtoUpdateMovie) {
    const findIndex = movies.findIndex(movie => movie.id === id)
    if (!movies[findIndex]) throw new Error("Film not found!")

    const updatedMovie = { ...movies[findIndex], ...movie }
    const updateMovies = movies.map(movie => movie.id === id ? updatedMovie : movie)

    await writeMoviesFile(updateMovies as movie[])
    return [updatedMovie.id]
  }

  async delete(id: uuid) {
    const removeMovie = movies.filter(movie => movie.id !== id)
    await writeMoviesFile(removeMovie)
  }
}
