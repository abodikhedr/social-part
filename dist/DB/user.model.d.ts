import mongoose from "mongoose";
import { genderEnum, roleEnum } from "../common/enum/user.enum.js";
export interface Iuser {
    fName: string;
    lName: string;
    email: string;
    password: string;
    role: roleEnum;
    isConfirmed: boolean;
    gender?: genderEnum;
    phone?: string;
    profileImage: string;
}
declare const userModel: mongoose.Model<any, {}, {}, {}, any, any, any> | mongoose.Model<Iuser, {}, {}, {}, mongoose.Document<unknown, {}, Iuser, {}, mongoose.DefaultSchemaOptions> & Iuser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Iuser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default userModel;
//# sourceMappingURL=user.model.d.ts.map