import { NextFunction, Request, Response } from "express";
export declare class AppError extends Error {
    message: any;
    statusCode: number;
    constructor(message: any, statusCode?: number);
}
export declare const GlobalErrorHandler: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=globalErrorHandling.d.ts.map