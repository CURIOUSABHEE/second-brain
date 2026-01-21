import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { UserModel } from "./schemas/schema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { MONGO_URI } from "./config.js";
import { secret } from "./config.js";
import { userMiddleware } from "./middleware.js"

const PORT: number = 3000;
const app: express.Application = express();


app.use(express.json());

app.get("/health", (req, res) => {
    console.log("The server is running all right")
    res.json({
        message: "Very Healthy"
    })
})

app.post("/api/v1/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "username and password are required"
            });
        }

        const user = await UserModel.create({
            username,
            password
        });

        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (err) {
        console.error(err);
        res.status(411).json({
            message: "User already exists"
        });
    }
})

app.post("/api/v1/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "username and password are required"
            });
        }

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            const token = jwt.sign({
                id: existingUser._id
            }, secret);
            res.json({ token });
        } else {
            res.status(403).json({
                message: "Invalid Credientials"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(411).json({
            message: "User already exists"
        });
    }

})

app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/content", (req, res) => {

})

app.delete("/api/v1/content", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.post("/api/v1/brain/:sharelink", (req, res) => {

})


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection failed", err));