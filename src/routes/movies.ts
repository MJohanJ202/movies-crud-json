import { Router } from 'express'
import { create, getAll, getById, remove, update } from '../controllers/index.js'
import { confirmIsValidId, validationBody, validationPartialBody } from '../middlewares/index.js'

const router: Router = Router()

router.get('/', getAll)
router.get('/:id', confirmIsValidId, getById)
router.post('/', validationBody, create)
router.patch('/:id', confirmIsValidId, validationPartialBody, update)
router.delete('/:id', confirmIsValidId, remove)

export default router
