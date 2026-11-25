"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multer_cloud = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_enum_js_1 = require("../enum/multer.enum.js");
const node_os_1 = require("node:os");
const node_crypto_1 = require("node:crypto");
const globalErrorHandling_js_1 = require("../utils/globalErrorHandling.js");
const multer_cloud = ({ customTypes = multer_enum_js_1.multer_Enum.images, store_type = multer_enum_js_1.storeEnum.memory }) => {
    const storage = store_type === multer_enum_js_1.storeEnum.memory ?
        multer_1.default.memoryStorage() :
        multer_1.default.diskStorage({
            destination: (0, node_os_1.tmpdir)(),
            filename: (req, file, cb) => {
                cb(null, (0, node_crypto_1.randomUUID)() + "__" + file.originalname);
            }
        });
    function fileFilter(req, file, cb) {
        if (customTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new globalErrorHandling_js_1.AppError("invalid file type"));
        }
    }
    const upload = (0, multer_1.default)({ storage, fileFilter });
    return upload;
};
exports.multer_cloud = multer_cloud;
//# sourceMappingURL=multer.cloud.js.map