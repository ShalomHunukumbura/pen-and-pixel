import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import {  Upload } from "@aws-sdk/lib-storage";
import { pre } from "framer-motion/client";
import { S3Client } from "@aws-sdk/client-s3";
dotenv.config()

const router = express.Router()

// Initialize the S3 client
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Initialize Multer
const storage = multer.memoryStorage(); // Store file temporarily in memory
const upload = multer({ storage });

//upload a single image
router.post("/", upload.single("image"), async (req, res) => {
    if(!req.file){
        return res.status(400).json({error: "Image upload failed"})
    }

    //prepare upload parameters
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `banner/${Date.now()}_${req.file.originalname}` ,//file path in s3
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      
    }

    const uploader = new Upload({
        client: s3,
        params: uploadParams,
    })

   try{
    const result = await uploader.done()
    const imageURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
    res.status(200).json({ imageURL });
    console.log("image upload succesful");
    

   } catch (err) {
    console.error("Error uploading image", err);
    res.status(500).json({error: "Failed to upload image"})
    
   }
})

export default router