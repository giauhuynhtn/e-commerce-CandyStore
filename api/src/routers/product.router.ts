import express from 'express'

import {
  createProduct,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
  // sortByName,
  filterByName,
  filterByCategory,
} from '../controllers/product.controller'

const router = express.Router()

router.get('/', findAll)
router.get('/:productId', findById)
// router.get('/sort/:sortType', sortByName)
router.get('/filterByName/:filterValue', filterByName)
router.get('/filterByCategory/:filterValue', filterByCategory)
router.post('/', createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
