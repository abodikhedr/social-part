import { Model } from "mongoose";
import { DBRepository } from "./db.repository.js";
import { Iuser } from "./models/user.model.js";
export declare class UserRepository extends DBRepository<Iuser> {
    readonly model: Model<Iuser>;
    constructor(model?: Model<Iuser>);
    createUser: (data: Partial<Iuser>) => Promise<(import("mongoose").Document<unknown, {}, Iuser, {}, import("mongoose").DefaultSchemaOptions> & Iuser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
//# sourceMappingURL=user.repository.d.ts.map