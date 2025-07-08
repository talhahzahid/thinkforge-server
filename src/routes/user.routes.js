import express from "express";
import { logOut, signIn, signUp } from "../controllers/user.controllers.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", signIn);
router.get("/logout", logOut);


export default router;
