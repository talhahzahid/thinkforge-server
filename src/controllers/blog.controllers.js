import Users from "../models/user.models.js";
import blogs from '../models/blog.models.js'
const addBlog = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }
  if (!req.user) {
    return res.status(401).json({ message: "User unauthorized" });
  }
  try {
    const userRef = req.user;
    await blogs.create({ title, description, userRef });
    res.status(201).json({ message: "Blog added successfully", userRef });
  } catch (error) {
    console.error("Add Blog Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const getAllBlogInDataBase = await blogs.find({});
    res.status(200).json({
      message: "Blogs fetched successfully",
      blogs: getAllBlogInDataBase,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addBlog, getAllBlog };
