import { Router } from 'express'
import { readdir } from "node:fs"

const router: Router = Router()

readdir(__dirname, { encoding: 'utf-8' }, (err, files) => {
  if (err) return router.use('/404')

  const excludePathName = 'index'
  const clearPathName = (file: string) => {
    const pathName = file.replace(/.ts|.js/, '')
    return pathName.toLowerCase()
  }

  const addRoutes = async (endPoint: string) => {
    // dynamic import router
    const endPointModuleRoute = await import(`${__dirname}/${endPoint}`)
    const endPointRoutes = endPointModuleRoute.default
    router.use(`/${endPoint}`, endPointRoutes) // TODO-- > http://localhost:1234/notes 
  }

  files.map(clearPathName)
    .filter(path => path !== excludePathName)
    .forEach(addRoutes)

  return null
})

export default router
