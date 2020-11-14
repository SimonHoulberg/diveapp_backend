import { Router } from "express"
import { getUser, getUsers, addUser, updateUser, deleteUser } from "../controllers/users"

const router: Router = Router()

router.get("/user/:id", getUser)

router.get("/users", getUsers)

router.post("/add-user", addUser)

router.put("/edit-user/:id", updateUser)

router.delete("/delete-user/:id", deleteUser)

export default router