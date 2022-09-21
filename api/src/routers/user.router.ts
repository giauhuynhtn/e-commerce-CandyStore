import express from 'express'

import { createUser, findAll, findById } from '../controllers/user.controller'

const router = express.Router()

router.get('/', findAll)
router.get('/:userId', findById)
router.post('/', createUser)

export default router
