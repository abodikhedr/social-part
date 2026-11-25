"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_enum_js_1 = require("../common/enum/user.enum.js");
const userSchema = new mongoose_1.default.Schema({
    fName: {
        type: String,
        trim: true,
        minlength: 3,
        maxLength: 30,
        required: true
    },
    lName: {
        type: String,
        trim: true,
        minlength: 3,
        maxLength: 30,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        enum: [user_enum_js_1.genderEnum.male, user_enum_js_1.genderEnum.female,],
        default: user_enum_js_1.genderEnum.male
    },
    role: {
        type: String,
        enum: [user_enum_js_1.roleEnum.user, user_enum_js_1.roleEnum.admin,],
        default: user_enum_js_1.roleEnum.user
    },
    phone: String,
    profileImage: String,
    isConfirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    strictQuery: true
});
const userModel = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map