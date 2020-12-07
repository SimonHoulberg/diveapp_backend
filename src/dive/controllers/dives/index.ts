
import { Response, Request } from "express"
import { IDive } from "./../../types/dive"
import Dive from "../../models/dive"

const getDive = async (req: Request, res: Response): Promise<void> => {
  try {
    const {params: { id }} = req
    const dive: IDive | null = await Dive.findById({ _id: id })
    res.status(200).json({ dive })
  } catch (error) {
    throw error
  }
}

const getDives = async (req: Request, res: Response): Promise<void> => {
  try {
    const dives: IDive[] = await Dive.find()
    res.status(200).json({ dives })
  } catch (error) {
    throw error
  }
}

const addDive = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<IDive, "name" | "location" | "date" | "attendees">
  
      const dive: IDive = new Dive({
        name: body.name,
        location: body.location,
        date: body.date,
        attendees: body.attendees
      })
  
      const newDive: IDive = await dive.save()
      const allDives: IDive[] = await Dive.find()
  
      res
        .status(201)
        .json({ message: "Dive added", dive: newDive, dives: allDives})
    } catch (error) {
      throw error
    }
  }

const updateDive = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateDive: IDive | null = await Dive.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allDives: IDive[] = await Dive.find()
      res.status(200).json({
        message: "Dive updated",
        dive: updateDive,
        dives: allDives,
      })
    } catch (error) {
      throw error
    }
  }

const deleteDive = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedDive: IDive | null = await Dive.findByIdAndRemove(
        req.params.id
      )
      const allDives: IDive[] = await Dive.find()
      res.status(200).json({
        message: "Dive deleted",
        dive: deletedDive,
        dives: allDives,
      })
    } catch (error) {
      throw error
    }
  }
  
  export { getDive, getDives, addDive, updateDive, deleteDive }