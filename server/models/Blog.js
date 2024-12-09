import mongoose,{Schema} from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    bannerURL: { type: String, required: true},// s3 image url
    author:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
})

export default mongoose.model("Blog", blogSchema)