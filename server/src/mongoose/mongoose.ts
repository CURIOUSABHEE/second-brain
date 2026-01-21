import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const MONGO_URL: string = process.env.MONGO_URL || " ";

if (!MONGO_URL) {
    throw new Error("MongoDB url ENV is not working");
}

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("mongoDb is connected");
    }).catch(() => {
        console.log("Somthing went wrong with DB connection")
    })