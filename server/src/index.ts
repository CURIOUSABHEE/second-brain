import express from "express";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;
const app: express.Application = express();
dotenv.config();

app.use(express.json());

app.get("/health", (req, res) => {
    console.log("The server is running all right")
    res.json({
        message: "Very Healthy"
    })
})

app.post("/api/v1/signup", (req, res)=>{
    
})

app.post("/api/v1/signin", (req, res)=>{
    
})

app.post("/api/v1/content", (req, res)=>{
    
})

app.get("/api/v1/content", (req, res)=>{
    
})

app.delete("/api/v1/content", (req, res)=>{
    
})

app.post("/api/v1/brain/share", (req, res)=>{
    
})

app.post("/api/v1/brain/:sharelink", (req, res)=>{
    
})



app.listen(PORT, () => {
    console.log("the server is running at 3000 port")
})