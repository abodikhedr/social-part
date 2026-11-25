"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_BUCKET_NAME = exports.AUDIANCE_EMAIL = exports.USER_PASSWORD = exports.USER_EMAIL = exports.SALT_ROUNDS = exports.ENCRYPTION_KEYS = exports.REFRESH_TOKEN_SEGNATURE = exports.ACCESS_TOKEN_SEGNATURE = exports.REDIS_URL = exports.DB_URI = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
const node_path_1 = require("node:path");
const NODE_ENV = process.env.NODE_ENV;
(0, dotenv_1.config)({ path: (0, node_path_1.resolve)(`.env.${NODE_ENV}`) });
exports.PORT = +process.env.PORT;
exports.DB_URI = process.env.DB_URI;
exports.REDIS_URL = process.env.REDIS_URL;
exports.ACCESS_TOKEN_SEGNATURE = process.env.ACCESS_TOKEN_SEGNATURE;
exports.REFRESH_TOKEN_SEGNATURE = process.env.REFRESH_TOKEN_SEGNATURE;
exports.ENCRYPTION_KEYS = process.env.ENCRYPTION_KEYS;
exports.SALT_ROUNDS = +process.env.SALT_ROUNDS;
exports.USER_EMAIL = process.env.USER_EMAIL;
exports.USER_PASSWORD = process.env.USER_PASSWORD;
exports.AUDIANCE_EMAIL = process.env.AUDIANCE_EMAIL;
exports.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
//# sourceMappingURL=config.service.js.map