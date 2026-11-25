"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const validatiov_js_1 = require("../../common/middleware/validatiov.js");
const authentication_js_1 = require("../../common/middleware/authentication.js");
const user_service_js_1 = __importDefault(require("./user.service.js"));
const user_validation_js_1 = require("./user.validation.js");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/profile", (0, validatiov_js_1.validation)(user_validation_js_1.getProfileSchema), authentication_js_1.authentication, user_service_js_1.default.getProfile);
exports.userRouter.patch("/update_profile", (0, validatiov_js_1.validation)(user_validation_js_1.updateProfileSchema), authentication_js_1.authentication, user_service_js_1.default.updataProfile);
exports.userRouter.put("/follow", (0, validatiov_js_1.validation)(user_validation_js_1.followSchema), authentication_js_1.authentication, user_service_js_1.default.follow);
exports.userRouter.put("/unfollow", (0, validatiov_js_1.validation)(user_validation_js_1.unFollowSchema), authentication_js_1.authentication, user_service_js_1.default.unFollow);
exports.userRouter.get("/search_user/:id", (0, validatiov_js_1.validation)(user_validation_js_1.searchUserSchema), user_service_js_1.default.searchUser);
//# sourceMappingURL=user.controller.js.map