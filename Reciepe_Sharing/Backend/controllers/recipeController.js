import Recipe from "../models/Recipe.js";

// Create Recipe
export const createRecipe = async (req, res) => {
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
};


// Get All Recipes
export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate("createdBy", "username role");

        res.json(recipes);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Get My Recipes
export const getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ createdBy: req.user.id })
            .populate("createdBy", "username role");

        res.json(recipes);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Delete Recipe (Admin)
export const deleteRecipe = async (req, res) => {
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
};