import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"
import { AppError } from "../utils/globalErrorHandling.js"
type ReqType = keyof Request
type SchemaType = Partial<Record<ReqType, ZodType>>

export const validation = (schema: SchemaType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const resultError = []
        for (const key of Object.keys(schema) as ReqType[]) {
            if (!schema[key]) continue
            const result = schema[key].safeParse(req[key])
            if (!result.success) {
                resultError.push(result.error.message)
            }
        }

        if (resultError.length > 0) {
            throw new AppError(JSON.parse(resultError.join(", ")), 400);
        }
        next()
    }
}