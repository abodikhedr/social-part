"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_service_js_1 = require("../config/config.service.js");
const connectionDB = async () => {
    try {
        await mongoose_1.default.connect(config_service_js_1.DB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("database connected successfuly");
    }
    catch (error) {
        console.log("database failed to connect");
    }
};
exports.default = connectionDB;
//# sourceMappingURL=connectionDB.js.map