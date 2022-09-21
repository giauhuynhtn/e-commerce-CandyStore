import express from 'express'

import { createOrder, findAll, findById } from '../controllers/order.controller'

const router = express.Router()

router.get('/', findAll)
router.get('/:orderId', findById)
router.post('/', createOrder)

export default router
