import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/globalErrorHandling.js";
import { roleEnum } from "../enum/user.enum.js";

export const authorization= (roles:roleEnum[]=[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if (!req.user) {
            throw new AppError("unauthenticated",401);
            
        }
        if (!roles.includes(req.user.role)) {
            throw new Error("user not authorized");
        }

        next()
    }
}