import express from "express";
import { addComment, listComment, updateCommentStatus } from "../controllers/commentController.js";
import authMiddleware from "../middleware/auth.js";

const commentRouter = express.Router();

commentRouter.post("/add", authMiddleware, addComment);
commentRouter.get("/list", listComment);
commentRouter.post("/update-status", updateCommentStatus);

export default commentRouter;