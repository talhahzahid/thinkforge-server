// user authorization
import jwt from "jsonwebtoken";
import Users from "../models/user.models.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader, "AuthHeader");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await Users.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
