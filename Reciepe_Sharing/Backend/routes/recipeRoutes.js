import express from "express";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import {
    createRecipe,
    getAllRecipes,
    getMyRecipes,
    deleteRecipe
} from "../controllers/recipeController.js";

const router = express.Router();

router.post("/", protect, createRecipe);
router.get("/", getAllRecipes);
router.get("/my", protect, getMyRecipes);
router.delete("/:id", protect, authorize(["admin"]), deleteRecipe);

export default router;