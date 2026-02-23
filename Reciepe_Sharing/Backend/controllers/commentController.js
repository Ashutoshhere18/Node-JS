import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
    try {
        const comment = new Comment({
            text: req.body.text,
            recipe: req.params.recipeId,
            user: req.user.id
        });

        await comment.save();
        res.status(201).json(comment);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ recipe: req.params.recipeId })
            .populate("user", "username role");

        res.json(comments);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};