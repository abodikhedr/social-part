import { NextFunction, Request, Response } from "express";
import { roleEnum } from "../enum/user.enum.js";
export declare const authorization: (roles?: roleEnum[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorization.d.ts.map