import mongoose, { Document } from 'mongoose'

export type AdminDocument = Document & {
  firstname: string
  lastname: string
  email: string
  username: string
  password: string
  roles: string[]
}

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: 'Please enter a valid email',
    },
    required: [true, 'Email required'],
  },
  username: {
    type: String,
    required: [true, 'Username required'],
    default: 'username',
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ['productAdmin'],
  },
})

export default mongoose.model<AdminDocument>('Admin', adminSchema)
