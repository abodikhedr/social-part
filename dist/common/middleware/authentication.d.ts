import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { HydratedDocument, ObjectId } from "mongoose";
import { Iuser } from "../../DB/models/user.model.js";
export interface TokenPayLoad extends JwtPayload {
    id: ObjectId;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            decoded?: TokenPayLoad;
            user?: HydratedDocument<Iuser>;
        }
    }
}
export declare const authentication: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authentication.d.ts.map