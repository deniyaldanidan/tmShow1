import { NextFunction, Request, Response } from "express";

const allowedRolesFunc = (...allowedRoles:number[])=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        if (!(req as any)?.roles) return res.sendStatus(403);
        const rolesArray = [...allowedRoles];
        const result = Object.values((req as any).roles).find((val:any)=>rolesArray.includes(val))
        console.log(result)
        if (!result) return res.sendStatus(401);
        next()
    }
}

export default allowedRolesFunc;