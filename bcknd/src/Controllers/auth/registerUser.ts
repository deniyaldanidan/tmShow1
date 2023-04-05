import { Request, Response } from "express";
import User from "../../models/User";
import { assert, object, refine, string, StructError } from "superstruct";
import validator from 'validator';
import bcrypt from 'bcrypt';
import { signAccess, signRefresh } from "../../libs/signJWT";

const regInp = object({
    username: string(),
    password: refine(string(), "password", v=>validator.isStrongPassword(v)? true : "Password is too weak")
})

export default async function registerHandler(req:Request, res:Response){
    try {
        const {username, password} = req.body;
        assert({username, password}, regInp);

        const userFound = await User.findOne({username}).exec();
        if (userFound){
            return res.status(400).json({error: "Username already taken"});
        }

        const pwd = await bcrypt.hash(password, 10);
        const refreshToken = signRefresh(username);
        const newUser = await User.create({username, password:pwd, refreshToken});
        const accessToken = signAccess(newUser._id, username, newUser.roles);

        res.cookie("refresh", refreshToken, {maxAge:10*60*60*1000, httpOnly:true})
        return res.json({accessToken});
    } catch (error) {
        if (error instanceof StructError){
            const failures = error.failures();
            const errorObj = failures.map(err=>({[err.key]: err.message}))
            return res.status(400).json({errors: errorObj})
        }

        return res.status(500).json({error: "Error happpened"})
    }
}