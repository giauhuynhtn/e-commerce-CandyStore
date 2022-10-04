import mongoose, { Document } from 'mongoose'

export type OrderDocument = Document & {
  orderDate: Date
  deliveryDate: Date
  returnDate: Date
  products: mongoose.Schema.Types.ObjectId[]
  userId: mongoose.Schema.Types.ObjectId
  status: 'pending' | 'delivered' | 'returned' | 'cancelled'
}

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    index: true,
    default: new Date(),
  },
  deliveryDate: {
    type: Date,
  },
  returnDate: {
    type: String,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    default: 'pending',
  },
})

export default mongoose.model<OrderDocument>('Order', orderSchema)
