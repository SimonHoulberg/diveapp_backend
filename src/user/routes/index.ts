import { Router } from "express"
import { getUser, deleteUser, updateUser, signUp, logIn } from "../controllers/users"

const router: Router = Router()

router.get("/user", getUser)
router.delete("/user-delete/:id", deleteUser)
router.put("/user-edit/:id", updateUser)
router.post("/signup", signUp)
router.post("/login", logIn)

export default router