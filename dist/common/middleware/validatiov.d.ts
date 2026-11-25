import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
type ReqType = keyof Request;
type SchemaType = Partial<Record<ReqType, ZodType>>;
export declare const validation: (schema: SchemaType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=validatiov.d.ts.map