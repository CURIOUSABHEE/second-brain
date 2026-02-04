import express from "express";
import { ContentModel, UserModel } from "./schemas/schema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { userMiddleware } from "./middleware.js"
import { LinkModel } from "./schemas/schema.js";
import { randomBytes } from "node:crypto";
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();
const secret = process.env.secret || "your-secret-key";
const PORT = parseInt(process.env.port || "3000", 10);
const MONGO_URI = process.env.MONGO_URI || "";

if (!process.env.MONGO_URI) {
    console.warn("Warning: MONGO_URI is not set in environment variables");
}

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://second-brain-three-eta.vercel.app"
    ],
    credentials: true
}));

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
            }, secret as string);
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

app.delete("/api/v1/content/:contentId", userMiddleware, async (req, res) => {
    try {
        const { contentId } = req.params;

        const result = await ContentModel.deleteOne({
            _id: contentId,
            userId: req.userId,
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Content not found or unauthorized"
            });
        }

        res.status(200).json({
            message: "Deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete content"
        });
    }
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;

    if (share) {
        const existingLink = await LinkModel.findOne({
            userId: req.userId,
        })
        if (existingLink) {
            res.json({
                hash: existingLink.hash,
            })
            return;
        } else {
            const hash = randomBytes(10).toString("hex");
            await LinkModel.create({
                hash: hash,
                userId: req.userId
            })

            res.json({
                hash
            })
        }
    } else {
        await LinkModel.deleteOne({
            userId: req.userId,
        })
    }
})


app.get("/api/v1/brain/:sharelink", async (req, res) => {
    const hash = req.params.sharelink;
    const link = await LinkModel.findOne({
        hash
    })
    if (!link) {
        res.status(404).json({
            message: "Sorry Incorrect Input",
        })
        return;
    }

    const content = await ContentModel.find({
        userId: link?.userId,
    })

    const user = await UserModel.findOne({
        _id: link?.userId,
    })
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }
    res.json({
        username: user.username,
        content: content
    })
})


app.listen(PORT as number, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose
    .connect(MONGO_URI as string)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection failed", err));