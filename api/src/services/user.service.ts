import { NotFoundError } from '../helpers/apiError'
import User, { UserDocument } from '../models/user'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} does not exist`)
  }

  return foundUser
}

export default { create, findAll, findById }
