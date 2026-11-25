"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_otp = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = require("crypto");
const config_service_js_1 = require("../../config/config.service.js");
const sendEmail = async ({ to, subject, html, attachments = [] }) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: config_service_js_1.USER_EMAIL,
            pass: config_service_js_1.USER_PASSWORD
        }
    });
    const info = await transporter.sendMail({
        from: `"abodi" <${config_service_js_1.USER_EMAIL}>`,
        to: to,
        subject: subject,
        html: html || "<h1>hello<h1>",
        attachments: attachments
    });
    return info.accepted.length > 0 ? true : false;
};
exports.sendEmail = sendEmail;
const generate_otp = async () => {
    return (0, crypto_1.randomInt)(100000, 1000000).toString();
};
exports.generate_otp = generate_otp;
//# sourceMappingURL=sendEmail.js.map