import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ContentModel, UserModel } from "./schemas/schema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { MONGO_URI } from "./config.js";
import { secret } from "./config.js";
import { userMiddleware } from "./middleware.js"
import { PORT } from "./config.js";

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
                message: "Invalid Credentials"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(411).json({
            message: "User already exists"
        });
    }

})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { title, url, type } = req.body;

    const content = await ContentModel.create({
        title,
        url,
        type,
        userId: req.userId,
        tags: []
    })

    if (content) {
        res.status(200).json({
            message: "content added"
        })
    } else {
        res.status(403).json({
            message: "cannot add the content"
        });
    }

})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const content = await ContentModel.find({
            userId: userId,
        }).populate("userId", "username");

        res.status(200).json({
            content
        })

    } catch (error) {
        res.status(403).json({
            message: "could not fetch the content"
        })
    }


})

app.delete("/api/v1/content", async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        userId: req.userId,
    })

    res.status(200).json({
        message: "Deleted"
    })

})

app.post("/api/v1/brain/share", (req, res) => {
    
})

app.get("/api/v1/brain/:sharelink", (req, res) => {
    res.status(501).json({ message: "Not implemented yet" });
})


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection failed", err));