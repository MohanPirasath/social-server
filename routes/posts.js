

import express from "express"

import { getPost,createPost,updatePost,deletePost,likePost } from "../controllers/posts.js"

import auth from "../middleware/auth.js"




const router = express.Router()

router.get("/",getPost)
router.post("/",auth,createPost)
router.patch("/:id",auth,updatePost)
router.patch("/:id/likePost",auth,likePost)
router.delete("/:id",auth,deletePost)





export default router