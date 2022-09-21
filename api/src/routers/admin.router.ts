import express from 'express'

import {
  createAdmin,
  deleteAdmin,
  findAll,
  findById,
  updateAdmin,
} from '../controllers/admin.controller'

const router = express.Router()

router.get('/', findAll)
router.get('/:adminId', findById)
router.post('/', createAdmin)
router.put('/:adminId', updateAdmin)
router.delete('/:adminId', deleteAdmin)

export default router
