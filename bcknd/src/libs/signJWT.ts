import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';


export const signAccess = (userId:Types.ObjectId, username:string, roles:any)=>{
    return jwt.sign({userId, username, roles}, process.env.ACCESS_SECRET as string, {expiresIn:"5h"})
}

export const signRefresh = (username:string)=>{
    return jwt.sign({username}, process.env.REFRESH_SECRET as string, {expiresIn:"10h"})
}