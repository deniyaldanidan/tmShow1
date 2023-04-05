import { Request, Response } from "express";
import User from "../../models/User";

const logoutController = async (req:Request, res:Response) => {
    const refreshToken = req.cookies?.refresh;
    if (!refreshToken) return res.sendStatus(204);
    
    res.clearCookie('refresh', { httpOnly: true });
    
    try {
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (foundUser) {
            await User.findByIdAndUpdate(foundUser.id, {refreshToken: ""});
        }
        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
        return res.sendStatus(204);
    }
}

export default logoutController;