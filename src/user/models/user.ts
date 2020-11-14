import { IUser } from "../types/user"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default model<IUser>("User", userSchema)