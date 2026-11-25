"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalRules = void 0;
const zod_1 = __importDefault(require("zod"));
const user_enum_js_1 = require("../enum/user.enum.js");
const mongoose_1 = require("mongoose");
exports.generalRules = {
    id: zod_1.default.string().refine((value) => {
        return mongoose_1.Types.ObjectId.isValid(value);
    }, {
        message: "inValid id"
    }),
    fName: zod_1.default.string().min(2).max(10),
    lName: zod_1.default.string().min(2).max(10),
    email: zod_1.default.email(),
    password: zod_1.default.string(),
    age: zod_1.default.number().min(18).max(60),
    phone: zod_1.default.string(),
    gender: zod_1.default.enum([user_enum_js_1.genderEnum.male, user_enum_js_1.genderEnum.female]),
    otp: zod_1.default.string().regex(/^[0-9]{6}$/),
    token: zod_1.default.strictObject({
        authorization: zod_1.default.string(),
        connection: zod_1.default.string().optional(),
        "accept-encoding": zod_1.default.string().optional(),
        accept: zod_1.default.string().optional(),
        "user-agent": zod_1.default.string().optional(),
        host: zod_1.default.string().optional(),
        "content-length": zod_1.default.string().optional(),
        "postman-token": zod_1.default.string().optional(),
        "content-type": zod_1.default.string().optional(),
    })
};
//# sourceMappingURL=generalRules.js.map