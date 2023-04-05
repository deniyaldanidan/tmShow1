import { Request, Response } from "express"
import Blog from "../../models/Blog"


export default async function deleteBlog (req:Request, res:Response){
    try {
        const id = req.params.id
        await Blog.findByIdAndDelete(id);
        return res.json({success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Error Happened"})
    }
}