import { Request, Response, NextFunction } from 'express'

import Order, { OrderDocument } from '../models/order'
import User from '../models/user'
import orderService from '../services/order.service'
import { BadRequestError } from '../helpers/apiError'

// POST /orders
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderDate, deliveryDate, returnDate, product, userId } = req.body
    const order = new Order({ orderDate, deliveryDate, returnDate, product, userId })

    const user = await User.updateOne({ _id: userId }, { $push: { order: order._id } })

    await orderService.create(order)

    res.json(order)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

//  GET /orders
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await orderService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /orders/:orderId
export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await orderService.findById(req.params.orderId))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}
