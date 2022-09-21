import { NotFoundError } from '../helpers/apiError'
import Product, { ProductDocument } from '../models/product'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

const findAll = async (): Promise<ProductDocument[]> => {
  return Product.find()
}

const findById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }

  return foundProduct
}

export default { create, findAll, findById }
