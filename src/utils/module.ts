import { createRequire } from 'module'
import { dirname } from 'path'
import { fileURLToPath } from "url"

export const getDirname = (url: string) => {
  return dirname(fileURLToPath(url))
}

export const getModule = (rootDir = dirname(getDirname(import.meta.url)), path: string) => {
  const require = createRequire(rootDir)
  return require(path)
}
