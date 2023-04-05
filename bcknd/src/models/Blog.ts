import mongoose, {Schema} from "mongoose";
import User from "./User";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: User.modelName,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;