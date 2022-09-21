import { NotFoundError } from '../helpers/apiError'
import Order, { OrderDocument } from '../models/order'

const create = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save()
}

const findAll = async (): Promise<OrderDocument[]> => {
  return Order.find().populate('product')
}

const findById = async (orderId: string): Promise<OrderDocument> => {
  const foundOrder = await Order.findById(orderId).populate('product')

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} does not exist`)
  }

  return foundOrder
}

export default { create, findAll, findById }
