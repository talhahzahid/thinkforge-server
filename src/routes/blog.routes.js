import express from "express";
import { addBlog, getAllBlog } from "../controllers/blog.controllers.js";
import { authenticate } from "../middleware/userRef.middleware.js";
const router = express.Router();

router.post("/addblog", authenticate, addBlog);
router.get("/getblog", getAllBlog);

export default router;
