import { writeFile } from 'fs/promises'
import { createRequire } from 'module'
import { movie } from '../../consts'

const required = createRequire(__dirname)
const DB_URI = `${__dirname}/movies.json`
export const movies: movie[] = required(DB_URI)
export const writeMoviesFile = (newMovies: movie[]) => {
  return writeFile(DB_URI, JSON.stringify(newMovies))
}
