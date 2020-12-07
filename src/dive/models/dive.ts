import { IDive } from "../types/dive"
import { model, Schema } from "mongoose"

const diveSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    attendees: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
)

export default model<IDive>("Dive", diveSchema)