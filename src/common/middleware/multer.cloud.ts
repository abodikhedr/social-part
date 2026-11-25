import multer from "multer";
import { multer_Enum, storeEnum } from "../enum/multer.enum.js";
import { tmpdir } from "node:os"
import { randomUUID } from "node:crypto";
import { Request } from "express";
import { AppError } from "../utils/globalErrorHandling.js";

export const multer_cloud = ({
    customTypes = multer_Enum.images,
    store_type = storeEnum.memory
}: {
    customTypes?: string[],
    store_type: storeEnum
}) => {
    const storage = store_type === storeEnum.memory ?
        multer.memoryStorage() :
        multer.diskStorage({
            destination: tmpdir(),
            filename: (req, file, cb) => {
                cb(null, randomUUID() + "__" + file.originalname)
            }
        })

    function fileFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
        if (customTypes.includes(file.mimetype)) {
            cb(null, true)
        }
        else {
            cb(new AppError("invalid file type"))
        }
    }

    const upload = multer({ storage, fileFilter })
    return upload
}