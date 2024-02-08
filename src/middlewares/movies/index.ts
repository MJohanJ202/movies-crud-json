import { NextFunction, Request, Response } from 'express'
import { validateId, validatePostMovie, validateUpdateMovie } from '../../schemas/index.js'

function confirmIsValidId(req: Request, res: Response, next: NextFunction) {
  const result = validateId(req.params['id'])
  if (!result.success) return res.status(400).json({ error: result.error.message })

  req.params['id'] = result.data
  return next()
}

function validationBody(req: Request, res: Response, next: NextFunction) {
  const result = validatePostMovie(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.message })

  req.body = result.data
  return next()
}

function validationPartialBody(req: Request, res: Response, next: NextFunction) {
  const result = validateUpdateMovie(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.message })

  req.body = result.data
  return next()
}

export { confirmIsValidId, validationBody, validationPartialBody }

