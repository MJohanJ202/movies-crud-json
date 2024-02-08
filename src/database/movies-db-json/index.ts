import { writeFile } from 'fs/promises'
import { movie } from '../../consts.js'
import { getDirname, getModule } from '../../utils/module.js'

const dirname = getDirname(import.meta.url)
const DB_URI = `${dirname}/movies.json`
export const movies: movie[] = getModule(dirname, DB_URI)

export const writeMoviesFile = (newMovies: movie[]) => {
  return writeFile(DB_URI, JSON.stringify(newMovies))
}
