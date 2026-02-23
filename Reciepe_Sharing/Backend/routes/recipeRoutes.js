import express from "express";
import Recipe from "../models/Recipe.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();


// Create Recipe (only logged in users)
router.post("/", protect, async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;

        const recipe = new Recipe({
            title,
            ingredients,
            instructions,
            createdBy: req.user.id
        });

        await recipe.save();
        res.status(201).json(recipe);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// Get All Recipes (populate user)
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate("createdBy", "username role");

        res.json(recipes);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// Delete Recipe (Admin only)
router.delete("/:id", protect, authorize(["admin"]), async (req, res) => {
    try {

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        await Recipe.findByIdAndDelete(req.params.id);

        res.json({ message: "Recipe deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;