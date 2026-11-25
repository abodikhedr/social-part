"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_js_1 = require("../../DB/user.repository.js");
const success_response_js_1 = require("../../common/utils/success.response.js");
const globalErrorHandling_js_1 = require("../../common/utils/globalErrorHandling.js");
class userService {
    constructor() { }
    _userRepo = new user_repository_js_1.UserRepository();
    getProfile = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const userOpj = req.user?.toObject ? req.user.toObject() : { ...req.user };
        const { password, __v, isDeleted, ...userData } = userOpj;
        return {
            res,
            statusCode: 200,
            message: "user fetched successfully",
            data: userData
        };
    });
    updataProfile = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const { fName, lName, gender, phone } = req.body;
        let updateQuery = {};
        if (fName !== undefined) {
            updateQuery.fName = fName;
        }
        if (lName !== undefined) {
            updateQuery.lName = lName;
        }
        if (gender !== undefined) {
            updateQuery.gender = gender;
        }
        if (phone !== undefined) {
            updateQuery.phone = phone;
        }
        if (!req.user?._id) {
            throw new globalErrorHandling_js_1.AppError("error");
        }
        this._userRepo.findByIdAndUpdate({
            id: req.user._id,
            update: updateQuery,
            options: {}
        });
        return {
            res,
            statusCode: 200,
            message: "done",
            data: updateQuery
        };
    });
    follow = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const user = req.user;
        const { id } = req.query;
        const other_user = await this._userRepo.findById({
            id: id,
        });
        if (!other_user) {
            throw new globalErrorHandling_js_1.AppError("user doesnt exist");
        }
        if (other_user._id.equals(user?._id)) {
            throw new globalErrorHandling_js_1.AppError("you cant follow yourself");
        }
        if (user?.following?.some((id) => id.equals(other_user._id))) {
            throw new globalErrorHandling_js_1.AppError("user already followed");
        }
        user?.following?.push(other_user._id);
        other_user.followers?.push(user?._id);
        user?.save();
        other_user.save();
        return {
            res,
            statusCode: 200,
            message: `you followed ${other_user.fName} ${other_user.lName} successfully`
        };
    });
    unFollow = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const user = req.user;
        const { id } = req.query;
        let other_user = await this._userRepo.findById({
            id: id,
        });
        if (!other_user) {
            throw new globalErrorHandling_js_1.AppError("user doesnt exist");
        }
        if (!user) {
            throw new globalErrorHandling_js_1.AppError("user not found");
        }
        user.following = (user?.following?.filter((id) => {
            return !id.equals(other_user._id);
        }));
        other_user.followers = (other_user?.followers?.filter((id) => {
            return !id.equals(user._id);
        }));
        await user.save();
        await other_user.save();
        return {
            res,
            statusCode: 200,
            message: `you unfollowed ${other_user.fName} ${other_user.lName} successfully`
        };
    });
    searchUser = (0, success_response_js_1.success_response)(async (req, res, next) => {
        const { id } = req.params;
        const user = await this._userRepo.findById({ id: id });
        if (user == undefined) {
            throw new globalErrorHandling_js_1.AppError("user not found");
        }
        const userOpj = user?.toObject ? user.toObject() : { ...req.user };
        const { password, __v, isDeleted, isConfirmed, provider, phone, ...userData } = userOpj;
        return { res, statusCode: 200, message: "user found", data: userData };
    });
}
exports.userService = userService;
exports.default = new userService();
//# sourceMappingURL=user.service.js.map