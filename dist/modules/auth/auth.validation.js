"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmOtpSchema = exports.refreshTokenSchema = exports.confirmPasswordOtpSchema = exports.forgetPasswordSchema = exports.resendOtpSchema = exports.signInSchema = exports.signUpSchema = void 0;
const z = __importStar(require("zod"));
const generalRules_js_1 = require("../../common/utils/generalRules.js");
exports.signUpSchema = {
    body: z.strictObject({
        fName: generalRules_js_1.generalRules.fName,
        lName: generalRules_js_1.generalRules.lName,
        email: generalRules_js_1.generalRules.email,
        password: generalRules_js_1.generalRules.password,
        cPassword: z.string(),
        gender: generalRules_js_1.generalRules.gender,
        phone: generalRules_js_1.generalRules.phone,
    }).superRefine((value, ctx) => {
        if (value.cPassword !== value.password) {
            ctx.addIssue({
                code: "custom",
                message: "password and cPassword must be the same"
            });
        }
    })
};
exports.signInSchema = {
    body: z.strictObject({
        email: generalRules_js_1.generalRules.email,
        password: generalRules_js_1.generalRules.password
    })
};
exports.resendOtpSchema = {
    body: z.strictObject({
        email: generalRules_js_1.generalRules.email
    })
};
exports.forgetPasswordSchema = {
    body: z.strictObject({
        email: generalRules_js_1.generalRules.email
    })
};
exports.confirmPasswordOtpSchema = {
    body: z.strictObject({
        email: generalRules_js_1.generalRules.email,
        otp: generalRules_js_1.generalRules.otp,
        newpass: generalRules_js_1.generalRules.password
    })
};
exports.refreshTokenSchema = {
    headers: generalRules_js_1.generalRules.token
};
exports.confirmOtpSchema = {
    body: z.object({
        email: generalRules_js_1.generalRules.email,
        otp: generalRules_js_1.generalRules.otp,
    })
};
//# sourceMappingURL=auth.validation.js.map