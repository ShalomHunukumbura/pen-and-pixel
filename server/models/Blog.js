import mongoose,{Schema} from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
})

export default mongoose.model("Blog", blogSchema)