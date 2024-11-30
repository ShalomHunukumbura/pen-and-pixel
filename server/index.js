import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"

//load .env variables into process.ens
dotenv.config()

//initialize express application
const app = express();

//middleware
app.use(cors())
app.use(express.json());

app.use("/api/users",authRoutes)

//mongoose connection
mongoose.connect("mongodb://localhost:27017/UserRegistration")
.then(()=>{
    console.log("MongoDB connected");    
})
.catch((error)=>{
    console.error("Error connecting to MongoDB",error);
    
})

//start server
app.listen(3000, ()=> {
    console.log("server is running on port 3000")
})
