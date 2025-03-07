import express from "express";
import { loginUser, register, listUsers,getUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", loginUser);
userRouter.get("/list", listUsers);
userRouter.get("/me", authMiddleware, getUser);

export default userRouter;