import express from 'express'

import {
  createProduct,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller'

const router = express.Router()

router.get('/', findAll)
router.get('/:productId', findById)
router.post('/', createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
