import { Document } from "mongoose"

export interface IDive extends Document {
  dive: Object
  // name: string
  // location: string
  // date: Date
  // attending: Array<IAttendee>
}

// export interface IAttendee extends Document {
//   userID: string
//   deviceID: string
//   userName: string
//   maxDepth: string
//   duration: string
//   entries: Array<IDepth>
// }

// export interface IDepth extends Document {
//   timeStamp: string
//   depth: string
//   bottom: string
//   coordinates: string
//   time: string
//   status: string
// }