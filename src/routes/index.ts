import { Router } from 'express'
import { readdir } from "node:fs"
import { getDirname } from './../utils/module.js'

const router: Router = Router()
const dirname = getDirname(import.meta.url)
readdir(dirname, { encoding: 'utf-8' }, (err, files) => {
  if (err) return router.use('/404')

  const excludePathName = 'index'
  const clearPathName = (file: string) => {
    const pathName = file.replace(/.ts|.js/, '')
    return pathName.toLowerCase()
  }

  const addRoutes = async (endPoint: string) => {
    const module = await import(`./${endPoint}.js`)
    const endPointRouter = module.default
    router.use(`/${endPoint}`, endPointRouter) // TODO-- > http://localhost:1234/notes 
  }

  files.map(clearPathName)
    .filter(path => !path.includes(excludePathName))
    .forEach(addRoutes)

  return null
})

export default router
