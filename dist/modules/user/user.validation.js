"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUserSchema = exports.unFollowSchema = exports.followSchema = exports.updateProfileSchema = exports.getProfileSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const generalRules_js_1 = require("../../common/utils/generalRules.js");
exports.getProfileSchema = {
    headers: generalRules_js_1.generalRules.token
};
exports.updateProfileSchema = {
    headers: generalRules_js_1.generalRules.token,
    body: zod_1.default.strictObject({
        fName: generalRules_js_1.generalRules.fName.optional(),
        lName: generalRules_js_1.generalRules.lName.optional(),
        gender: generalRules_js_1.generalRules.gender.optional(),
        phone: generalRules_js_1.generalRules.phone.optional(),
    })
};
exports.followSchema = {
    headers: generalRules_js_1.generalRules.token,
    query: zod_1.default.strictObject({
        id: generalRules_js_1.generalRules.id
    })
};
exports.unFollowSchema = {
    headers: generalRules_js_1.generalRules.token,
    query: zod_1.default.strictObject({
        id: generalRules_js_1.generalRules.id
    })
};
exports.searchUserSchema = {
    params: zod_1.default.strictObject({ id: generalRules_js_1.generalRules.id })
};
//# sourceMappingURL=user.validation.js.map