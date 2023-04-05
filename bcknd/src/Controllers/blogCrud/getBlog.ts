import { Request, Response } from "express";
import Blog from "../../models/Blog";

export default async function getBlog(req:Request, res:Response){
    try {
        const id = req.params.id
        const foundblog = await Blog.findById(id).populate("author", ["username", "_id"]).exec();
        if (!foundblog){
            return res.sendStatus(404);
        }
        return res.json(foundblog)
    } catch (error) {
        return res.status(500).json({error: "Error Happened"})        
    }
}