import mongoose from "mongoose";
import Users from "../models/user.models.js";
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("blogs", blogSchema);
