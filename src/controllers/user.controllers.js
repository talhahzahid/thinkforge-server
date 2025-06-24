import jwt from "jsonwebtoken";
import Users from "../models/user.models";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });
};
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN, {
    expiresIn: "2d",
  });
};

const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  try {
    const findEmail = await Users.findOne({ email });
    if (findEmail) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    const registerUserInDataBase = await Users.create({
      userName,
      email,
      password,
    });
    res.status(200).json({
      message: "Sign up Successfully",
      user: registerUserInDataBase,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Network Error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  try {
    const findUser = await Users.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "Email not found" });
    }
    const validPassword = await bcrypt.compare(password, findUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const refreshToken = generateRefreshToken(findUser);
    const accessToken = generateAccessToken(findUser);
    res.cookies("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({
      message: "Login successful",
      user: findUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ message: "Network Error" });
  }
};

export { signUp, signIn };
