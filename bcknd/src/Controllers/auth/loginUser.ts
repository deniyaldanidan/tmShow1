import { Request, Response } from "express";
import User from "../../models/User";
import { assert, object, string, StructError } from "superstruct";
import bcrypt from 'bcrypt';
import { signAccess, signRefresh } from "../../libs/signJWT";

const logInp = object({
    username: string(),
    password: string()
})

export default async function loginHandler(req:Request, res:Response){
    try {
        const {username, password} = req.body;
        assert({username, password}, logInp);

        const userFound = await User.findOne({username}).exec();
        if (!userFound){
            return res.status(400).json({error: "User not found"});
        }

        const match = await bcrypt.compare(password, userFound.password);
        if (!match){
            return res.status(400).json({error: "Invalid values"})
        }

        const refreshToken = signRefresh(username);
        const accessToken = signAccess(userFound._id, username, userFound.roles);
        userFound.refreshToken = refreshToken
        await userFound.save()

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