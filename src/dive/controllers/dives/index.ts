
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
      const body = req.body as Pick<IDive, "dive">
  
      const dive: IDive = new Dive({
        dive: body.dive//,
        // location: body.location,
        // date: body.date,
        // attendees: body.attendees
      })
  
      await dive.save()
  
      res
        .status(201)
        .json({ msg: "Dive added"})
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

      await Dive.findByIdAndUpdate(
        { _id: id },
        body
      )

      res.status(200).json({
        msg: "Dive updated"
      })
    } catch (error) {
      throw error
    }
  }

const deleteDive = async (req: Request, res: Response): Promise<void> => {
    try {
      await Dive.findByIdAndRemove(
        req.params.id
      )
      res.status(200).json({
        msg: "Dive deleted",
      })
    } catch (error) {
      throw error
    }
  }
  
  export { getDive, getDives, addDive, updateDive, deleteDive }