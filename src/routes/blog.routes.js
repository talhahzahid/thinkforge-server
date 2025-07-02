import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controllers.js";
import { authenticate } from "../middleware/userRef.middleware.js";
const router = express.Router();
import { upload } from "../middleware/multer.middleware.js"
router.post("/addblog", authenticate, upload.single("imageUrl"), addBlog);
router.get("/getblog", getAllBlog);
router.get("/getblogbyid/:id", authenticate, getBlogById);
router.post("/deleteblog/:id", authenticate, deleteBlog);
router.post("/updateblog/:id", authenticate, updateBlog);

export default router;
