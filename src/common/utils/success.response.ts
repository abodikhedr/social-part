import { NextFunction, Request, Response } from "express"

// export const success_response=({
//     res,
//     statusCode=200,
//     message="done",
//     data=undefined
// }:{
//     res:Response,
//     statusCode?:number,
//     message?:string,
//     data?:any
// })=>{
//     return res.status(statusCode).json({message,data})
// }

export const success_response=(fn:Function)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        const {message="done",data=undefined,statusCode=200}=await fn(req,res,next)
        if (res.headersSent) return
        return res.status(statusCode).json({message,data})
    }
}