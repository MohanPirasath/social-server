

import express from "express"
// import { signin } from "../../social-app/src/Actions/auth.js"

import { signin,signup } from "../controllers/users.js"


const router = express.Router()

router.post("/signin",signin)
router.post("/signup",signup)




export default router
