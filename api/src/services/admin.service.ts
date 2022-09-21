import { NotFoundError } from '../helpers/apiError'
import Admin, { AdminDocument } from '../models/admin'

const create = async (admin: AdminDocument): Promise<AdminDocument> => {
  return admin.save()
}

const findAll = async (): Promise<AdminDocument[]> => {
  return Admin.find()
}

const findById = async (adminId: string): Promise<AdminDocument> => {
  const foundAdmin = await Admin.findById(adminId)

  if (!foundAdmin) {
    throw new NotFoundError(`Admin ${adminId} does not exist`)
  }

  return foundAdmin
}

const update = async (
  adminId: string,
  update: Partial<AdminDocument>
): Promise<AdminDocument | null> => {
  const foundAdmin = await Admin.findByIdAndUpdate(adminId, update, {
    new: true,
  })

  if (!foundAdmin) {
    throw new NotFoundError(`Admin ${adminId} does not exist`)
  }
  return foundAdmin
}

const updateOne = async (
  adminId: string,
  update: Partial<AdminDocument>
): Promise<AdminDocument | null> => {
  const foundAdmin = await Admin.findById(adminId)

  if (!foundAdmin) {
    throw new NotFoundError(`Admin ${adminId} does not exist`)
  }

  await Admin.updateOne({ _id: adminId }, { $push: update })

  return foundAdmin
}

const deleteAdmin = async (adminId: string): Promise<AdminDocument | null> => {
  const foundAdmin = await Admin.findByIdAndDelete(adminId)

  if (!foundAdmin) {
    throw new NotFoundError(`Admin ${adminId} does not exist`)
  }

  return foundAdmin
}

// createProduct
// updateProduct
// deleteProduct
// updateOrder

export default { create, findAll, findById, update, deleteAdmin, updateOne }
