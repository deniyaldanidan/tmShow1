import { Request, Response } from "express";
import Blog from "../../models/Blog";

export default async function getAllBlogs(req:Request, res:Response){
    try {
        const allblogs = await Blog.find({}, null, {lean:true}).populate("author", ["username", "_id"]);
        return res.json(allblogs)
    } catch (error) {
        return res.status(500).json({error: "Error Happened"})
    }
}