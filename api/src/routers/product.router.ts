import express from 'express'

import { createProduct, findAll, findById } from '../controllers/product.controller'

const router = express.Router()

router.get('/', findAll)
router.get('/:productId', findById)
router.post('/', createProduct)

export default router
