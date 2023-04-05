import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default function authOnly (req:Request, res:Response, next:NextFunction){
    const authHead = req.headers.authorization || req.headers.Authorization as string;
    if (!authHead?.startsWith('Bearer ')) return res.sendStatus(401);
    
    const accToken = authHead.split(" ")[1];
    jwt.verify(accToken, process.env.ACCESS_SECRET as string, (err:any, decoded:any)=>{
        if (err) return res.sendStatus(403);
        (req as any).userId = decoded.userId;
        (req as any).user = decoded.username;
        (req as any).roles = decoded.roles
        return next();
    })
}