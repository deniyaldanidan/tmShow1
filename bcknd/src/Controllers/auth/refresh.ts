import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { Request, Response } from 'express';
import { signAccess } from '../../libs/signJWT';

const refreshController = async (req:Request, res:Response) => {
    const refreshToken = req.cookies?.refresh;
    if (!refreshToken) return res.sendStatus(401);

    try {
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) return res.sendStatus(401);
        jwt.verify(refreshToken, process.env.REFRESH_SECRET as string, (err:any, decoded:any) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(400);
            const accessToken = signAccess(foundUser._id, foundUser.username, foundUser.roles)
            return res.json({ accessToken });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error Happened"});
    }
};

export default refreshController;