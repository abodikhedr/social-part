"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success_response = void 0;
// export const success_response=({
//     res,
//     statusCode=200,
//     message="done",
//     data=undefined
// }:{
//     res:Response,
//     statusCode?:number,
//     message?:string,
//     data?:any
// })=>{
//     return res.status(statusCode).json({message,data})
// }
const success_response = (fn) => {
    return async (req, res, next) => {
        const { message = "done", data = undefined, statusCode = 200 } = await fn(req, res, next);
        if (res.headersSent)
            return;
        return res.status(statusCode).json({ message, data });
    };
};
exports.success_response = success_response;
//# sourceMappingURL=success.response.js.map