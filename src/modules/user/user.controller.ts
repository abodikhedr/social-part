import { Router } from "express";
import { validation } from "../../common/middleware/validatiov.js";
import { authentication } from "../../common/middleware/authentication.js";
import  US from "./user.service.js";
import { followSchema, getProfileSchema, searchUserSchema, unFollowSchema, updateProfileSchema } from "./user.validation.js";



export const userRouter=Router()

userRouter.get("/profile",validation(getProfileSchema),authentication,US.getProfile)
userRouter.patch("/update_profile",validation(updateProfileSchema),authentication,US.updataProfile)
userRouter.put("/follow",validation(followSchema),authentication,US.follow)
userRouter.put("/unfollow",validation(unFollowSchema),authentication,US.unFollow)
userRouter.get("/search_user/:id",validation(searchUserSchema),US.searchUser)




