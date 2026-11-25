"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerLocal = void 0;
const multerLocal = ({ customPath = "General", customTypes = [] }) => {
    const path = `uploads/${customPath}`;
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path);
        },
        filename: (req, file, cb) => {
            cb(null, randomUUID() + "__" + file.originalname);
        }
    });
    const fileFilter = (req, file, cb) => {
        if (!customTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file"));
        }
        cb(null, true);
    };
    const upload = multer({ storage, fileFilter });
    return upload;
};
exports.multerLocal = multerLocal;
//# sourceMappingURL=multer.js.map