"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt_1 = require("bcrypt");
const config_service_js_1 = require("../../config/config.service.js");
const hash = async (plainText, saltRounds = config_service_js_1.SALT_ROUNDS) => {
    return (0, bcrypt_1.hashSync)(plainText, saltRounds);
};
exports.hash = hash;
const compare = async (plainText, hashedText) => {
    return (0, bcrypt_1.compareSync)(plainText, hashedText);
};
exports.compare = compare;
//# sourceMappingURL=hash.js.map