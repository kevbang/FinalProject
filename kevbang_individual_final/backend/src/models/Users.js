/**
 * Kevin Tran
 * This file serves as a way for me to keep track of favorite recipes.
 */
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: "recipes"
    }]
});

export const UserModel = mongoose.model("users", UserSchema);

