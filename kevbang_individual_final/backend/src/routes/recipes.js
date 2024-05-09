import { RecipeModel } from "../models/Recipes.js";
import mongoose from "mongoose";
import express from "express";
import { UserModel } from "../models/Users.js";


const router = express.Router();
router.use(express.json());

/**
 * Display recipes
 */
router.get("/", async (req, res) => {
    try{
        const data = await RecipeModel.find({});

        res.json(data);
    } 
    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

/**
 * Create Recipes
 */
router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body);

    try{
        const data = await recipe.save();
        res.status(201).json(data);

    }
    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

/**
 * Save a recipe
 */
router.put("/", async (req, res) => {
    
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const favorite = await UserModel.findById(req.body.userID);
        favorite.favorites.push(recipe); // add recipe to favorite recipes
        await favorite.save();
        res.status(201).json({favorites: favorite.favorites });
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

/**
 * Grabs ID of saved recipes. 
 */
router.get("/favorites/ids/:userID", async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.params.userID);
        res.status(201).json({ favorites: currentUser?.favorites });
        
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Grab favorite recipes
router.get("/favorites/:userID", async (req, res) => {
    try{
        const currentUser = await UserModel.findById(req.params.userID);
        const favorites = await RecipeModel.find({
            _id: { $in: currentUser.favorites },
        });
        res.status(201).json({ favorites });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
/**
 * Update a recipe
 */
router.put("/:recipeID", async (req, res) => {
    try {
        const { recipeID } = req.params;
        const res = req.body;
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeID, res, {new: true});
        if(!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(updatedRecipe);
    }
    catch (error) {
        console.log(error.message);
    }
})
router.delete("/:recipeID", async (req, res) => {
   try {
        const deleteRecipe = await RecipeModel.findByIdAndDelete(req.params.recipeID);
        if(!deleteRecipe){
            return res.status(404).json( { message: "Recipe not found" });
        }
        res.status(200).json({ message: "Recipe deleted successfully"});
   }
   catch (error) 
   {
        console.log(error.message);
        res.status(500).send({ message: error.message });

   }
});
export {router as recipeRouter} ;