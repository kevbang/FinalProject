/**
 * Kevin Tran
 * This file creates new recipes.
 */
import mongoose from "mongoose";
const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    instructions: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    prepTime: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);