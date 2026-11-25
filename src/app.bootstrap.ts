import express, { type NextFunction, type Request, type Response } from "express"
import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import { PORT } from "./config/config.service.js"
import { AppError, GlobalErrorHandler } from "./common/utils/globalErrorHandling.js"
import connectionDB from "./DB/connectionDB.js"
import { authRouter } from "./modules/auth/auth.controller.js"
import  RedisService  from "./DB/connection.redis.js"
import { userRouter } from "./modules/user/user.controller.js"

const app = express()
const port = PORT
const limiter = rateLimit({
    windowMs: 60 * 5 * 1000,
    limit: 30,
    skipSuccessfulRequests: true,
    message: {
        success: false,
        message: "too many requests"
    }
})
const bootstrap = async () => {


    app.use(express.json(), helmet(), cors(), limiter)


    await connectionDB()
    await RedisService.redisConnection()
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: "haii" })
    })

    app.use("/auth",authRouter)
    app.use("/user",userRouter)



    app.use("{/*demo}", (req: Request, res: Response, next: NextFunction) => {
        throw new AppError(`url:${req.originalUrl} with method:${req.method} not found`, 404);
    })
    app.use(GlobalErrorHandler);
    app.listen(port, () => {
        console.log(`app working on port:${port}`);
    })
}


export default bootstrap