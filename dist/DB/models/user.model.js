"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_enum_js_1 = require("../../common/enum/user.enum.js");
const hash_js_1 = require("../../common/security/hash.js");
const zod_1 = require("zod");
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
    },
    provider: {
        type: String,
        enum: [user_enum_js_1.providerEnum.system, user_enum_js_1.providerEnum.google,],
        default: user_enum_js_1.providerEnum.system
    },
    isDeleted: {
        type: zod_1.boolean,
        default: false
    },
    followers: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true,
    strictQuery: true
});
userSchema.pre("save", async function () {
    if (this.modifiedPaths().includes("password")) {
        this.is_new = this.isNew;
        this.password = await (0, hash_js_1.hash)(this.password);
    }
});
userSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate();
    const password = update?.password;
    if (password) {
        const hashed = await (0, hash_js_1.hash)(password);
        update.password = hashed;
        this.setUpdate(update);
    }
});
userSchema.pre(["find", "findOne"], async function () {
    const query = this.getQuery();
    const { paranoid, ...rest } = query;
    if (paranoid) {
        this.setQuery({ ...rest });
    }
    else {
        this.setQuery({ ...rest, isDeleted: { $ne: true } });
    }
});
const userModel = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map