import express, { NextFunction, Request, response, Response } from "express"
export class AppError extends Error {
    constructor(public message: any, public statusCode: number=500) {
        super()
    }
}

export const GlobalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const statusCode = err.statusCode as number || 500
    res.status(statusCode).json({
        message: err.message,
        statusCode,
        stack: err.stack,

    })
}