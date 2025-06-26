import Users from "../models/user.models.js";
import blogs from "../models/blog.models.js";

// add blog
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

// get all blog
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

// get blog by id
const getBlogById = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const userRef = req.user;
  if (!userRef) {
    return res.status(401).json({ message: "User unauthorized" });
  }
  try {
    const blog = await blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      message: "Success",
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const deletedBlog = await blogs.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({
      message: "Blog deleted successfully",
      data: deletedBlog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// update blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const updatedBlog = await blogs.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addBlog, getAllBlog, getBlogById, deleteBlog, updateBlog };
