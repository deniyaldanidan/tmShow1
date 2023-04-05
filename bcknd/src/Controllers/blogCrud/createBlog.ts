import { Request, Response } from "express";
import { StructError, assert, object, string } from "superstruct";
import Blog from "../../models/Blog";


const createReq = object({
    title : string(),
    excerpt : string(),
    content : string(),
    category: string()
})

export default async function createBlog(req:Request, res:Response){
    try {
        const {title, excerpt, content, category} = req.body;
        assert({title, excerpt, content, category}, createReq);

        const newBlog = await Blog.create({title, excerpt, content, author: (req as any).userId as any, category});
        return res.json({newBlog});

    } catch (error) {
        if (error instanceof StructError){
            return res.status(400).json({error: "Invalid values"})
        }
        return res.status(500).json({error: "Error happened"})
    }
}