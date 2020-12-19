import { IDive } from "../types/dive"
import { model, Schema } from "mongoose"

const diveSchema: Schema = new Schema(
  {

    dive: {
      type: Object,
      required: false,
    },

    // location: {
    //   type: String,
    //   required: true,
    // },

    // date: {
    //   type: Date,
    //   required: true,
    // },

    // attendees: {
    //   type: Array,
    //   required: true,
    // },
  },
  { timestamps: false }
)

export default model<IDive>("Dive", diveSchema)