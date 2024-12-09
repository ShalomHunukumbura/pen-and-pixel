import express from "express"
import Blog from "../models/Blog.js"
import { tr } from "framer-motion/client"


const router = express.Router()

//create a new blog
router.post("/", async (req, res) => {
    const {title, content, bannerURL} = req.body

    if (!title || !content || !bannerURL) {
        return res.status(400).json({error: "All fields are required"})
    }

    try{
        const newBlog = new Blog({title, content, bannerURL})
        await newBlog.save()
        res.status(201).json({message: "Blog created succesfully"})
    }catch (error){
        res.status(500).json({error: "Failed to create blog"})
    }
})

//fetch all blogs
router.get("/", async(req, res) => {
    try{
        const blogs = await Blog.find().sort({createdAt: -1})
        res.status(200).json(blogs)
    } catch (error){
        res.status(500).json({error: "Failed to fetch blogs"})
    }
})

export default router