import { Request, Response, NextFunction } from 'express'

import Product from '../models/product'
import productService from '../services/product.service'
import { BadRequestError } from '../helpers/apiError'

// POST /products
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, category, description, price, quantity, img } = req.body
    const product = new Product({ name, category, description, price, quantity, img })

    await productService.create(product)
    res.json(product)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}
// GET /products
export const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await productService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /products/:productId
export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await productService.findById(req.params.productId))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid request', 400, error))
    } else {
      next(error)
    }
  }
}
