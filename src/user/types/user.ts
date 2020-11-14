import { Document } from "mongoose"

export interface IUser extends Document {
  type: string
  name: string
  email: string
  password: string
}