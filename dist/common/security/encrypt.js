"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = Encrypt;
exports.decrypt = decrypt;
const node_crypto_1 = __importDefault(require("node:crypto"));
const config_service_js_1 = require("../../config/config.service.js");
const globalErrorHandling_js_1 = require("../utils/globalErrorHandling.js");
const ENCRYPTION_KEY = Buffer.from(config_service_js_1.ENCRYPTION_KEYS);
const IV_LENGTH = 16;
console.log(ENCRYPTION_KEY.length);
function Encrypt(plainText) {
    const iv = node_crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = node_crypto_1.default.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}
function decrypt(text) {
    const [ivHex, encryptedText] = text.split(':');
    if (!ivHex || !encryptedText) {
        throw new globalErrorHandling_js_1.AppError("invalid encrypted text", 400);
    }
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = node_crypto_1.default.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
//# sourceMappingURL=encrypt.js.map