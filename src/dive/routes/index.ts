import { Router } from "express"
import { getDive, getDives, addDive, updateDive, deleteDive } from "../controllers/dives"

const router: Router = Router()

router.get("/dive/:id", getDive)

router.get("/dives", getDives)

router.post("/add-dive", addDive)

router.put("/edit-dive/:id", updateDive)

router.delete("/delete-dive/:id", deleteDive)

export default router