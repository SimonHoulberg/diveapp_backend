import { Document } from "mongoose"

export interface IDive extends Document {
  name: string
  location: string
  date: Date
  attendees: Array<IAttendee>
}

export interface IAttendee extends Document {
  id: string
  name: string
  max_depth: number
  dive_duration: number
  depth: Array<IDepth>
}

export interface IDepth extends Document {
  timestamp: Date
  depth: number
}