/**
 * Kevin Tran
 * kevbang@iastate.edu
 * This is the main file handling backend logistics.
 */
import { recipeRouter } from "./routes/recipes.js";
import { userRouter } from "./routes/users.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";


const PORT = 3001;
const app = express();
const url = "mongodb://127.0.0.1:27017/finalproject"

app.use(express.json()); // converts data from frontend to JSON
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

mongoose.connect(url);

app.listen(PORT, () => console.log("The server has started at port: " + PORT));

