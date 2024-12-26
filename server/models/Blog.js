import mongoose,{Schema} from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true },  // Allow storing any object
    bannerURL: { type: String, required: true },  // S3 image URL
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Blog", blogSchema)