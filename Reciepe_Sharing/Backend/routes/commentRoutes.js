import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addComment, getComments } from "../controllers/commentController.js";

const router = express.Router();

router.post("/:recipeId", protect, addComment);
router.get("/:recipeId", getComments);

export default router;