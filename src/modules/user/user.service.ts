import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../DB/user.repository.js";
import { AuthService } from "../auth/auth.service.js";
import { success_response } from "../../common/utils/success.response.js";
import { genderEnum } from "../../common/enum/user.enum.js";
import mongoose, { ObjectId } from "mongoose";
import { AppError } from "../../common/utils/globalErrorHandling.js";



export class userService {
    constructor() { }
    private readonly _userRepo = new UserRepository()


    getProfile = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const userOpj = req.user?.toObject ? req.user.toObject() : { ...req.user }
        const { password, __v, isDeleted, ...userData } = userOpj
        return {

            statusCode: 200,
            message: "user fetched successfully",
            data: userData
        }
    })

    updataProfile = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const { fName, lName, gender, phone } = req.body

        let updateQuery: {
            fName?: string,
            lName?: string,
            gender?: genderEnum,
            phone?: string,

        } = {}

        if (fName !== undefined) {
            updateQuery.fName = fName
        }
        if (lName !== undefined) {
            updateQuery.lName = lName
        }
        if (gender !== undefined) {
            updateQuery.gender = gender
        }
        if (phone !== undefined) {
            updateQuery.phone = phone
        }
        if (!req.user?._id) {
            throw new AppError("error");

        }
        this._userRepo.findByIdAndUpdate({
            id: req.user._id as unknown as mongoose.Schema.Types.ObjectId,
            update: updateQuery,
            options: {}
        })

        return {

            statusCode: 200,
            message: "done",
            data: updateQuery
        }
    })

    follow = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user
        const { id } = req.query
        const other_user = await this._userRepo.findById({
            id: id as unknown as mongoose.Schema.Types.ObjectId,
        })
        if (!other_user) {
            throw new AppError("user doesnt exist")
        }
        if (other_user._id.equals(user?._id)) {
            throw new AppError("you cant follow yourself");

        }
        if (user?.following?.some((id) => id.equals(other_user._id))) {
            throw new AppError("user already followed")
        }
        user?.following?.push(other_user._id)
        other_user.followers?.push(user?._id!)
        user?.save()
        other_user.save()
        return {

            statusCode: 200,
            message: `you followed ${other_user.fName} ${other_user.lName} successfully`
        }
    })

    unFollow = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user
        const { id } = req.query
        let other_user = await this._userRepo.findById({
            id: id as unknown as mongoose.Schema.Types.ObjectId,
        })
        if (!other_user) {
            throw new AppError("user doesnt exist")
        }
        if (!user) {
            throw new AppError("user not found")
        }

        user.following = (user?.following?.filter((id) => {
            return !id.equals(other_user._id)
        }))!
        other_user.followers = (other_user?.followers?.filter((id) => {
            return !id.equals(user._id)
        }))!
        await user.save()
        await other_user.save()

        return {

            statusCode: 200,
            message: `you unfollowed ${other_user.fName} ${other_user.lName} successfully`
        }
    })

    searchUser = success_response(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        const user = await this._userRepo.findById({ id: id as unknown as mongoose.Schema.Types.ObjectId })
        if (user == undefined) {
            throw new AppError("user not found");
        }
        const userOpj = user?.toObject ? user.toObject() : { ...req.user }
        const { password, __v, isDeleted, isConfirmed, provider, phone, ...userData } = userOpj

        return { statusCode: 200, message: "user found", data: userData }
    })
}

export default new userService()