/**
 * Kevin Tran
 * This file serves as the authorization file for this program.
 */
import { UserModel } from "../models/Users.js";
import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password} = req.body;
    const existingUser = await UserModel.findOne({ username: username});

    if(existingUser) {
        return res.status(400).json({ message: "This username already exists."});
    }
    const hashed = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username: username, password: hashed});
    await newUser.save();

    res.json({ message: "You have successfully registered."});
});

router.post("/login", async (req, res) => {
    const { username, password} = req.body;
    const existingUser = await UserModel.findOne({ username: username});

    if(!existingUser) {
        return res.status(400).json({ message: "Your username or password is incorrect. Try again."});
    }

    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if(!checkPassword) {
        return res.status(400).json({ message: "Your username or password is incorrect. Try again."});
    }
    
    const token = jsonwebtoken.sign({ id: existingUser._id}, "secret");
    res.json({ token, userID: existingUser._id});
});

export const verification = (req, res, next) => {
    const header = req.headers.authorization;
    if (header) {
        jsonwebtoken.verify(header, "secret", (error) => {
        if (error) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

export { router as userRouter };