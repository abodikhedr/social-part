import mongoose, { HydratedDocument, mongo } from "mongoose"
import { genderEnum, providerEnum, roleEnum } from "../../common/enum/user.enum.js"
import { hash } from "../../common/security/hash.js"
import { sendEmail } from "../../common/services/sendEmail.js"
import { template } from "../../common/utils/html.template.js"
import { boolean } from "zod"


export interface Iuser {
    fName: string
    lName: string
    email: string
    password: string
    role: roleEnum
    isConfirmed: boolean
    gender?: genderEnum
    phone?: string
    profileImage?: string
    provider: providerEnum
    isDeleted?: boolean
    followers?: mongoose.Types.ObjectId[],
    following?: mongoose.Types.ObjectId[]

}

const userSchema = new mongoose.Schema<Iuser>({
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
        enum: [genderEnum.male, genderEnum.female,],
        default: genderEnum.male
    },
    role: {
        type: String,
        enum: [roleEnum.user, roleEnum.admin,],
        default: roleEnum.user
    },
    phone: String,
    profileImage: String,
    isConfirmed: {
        type: Boolean,
        default: false
    },
    provider: {
        type: String,
        enum: [providerEnum.system, providerEnum.google,],
        default: providerEnum.system
    },
    isDeleted: {
        type: boolean,
        default: false
    },
    followers: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
    ],
    following: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
    ]
}, {
    timestamps: true,
    strictQuery: true
}
)
userSchema.pre("save", async function (this: HydratedDocument<Iuser & { is_new: boolean }>) {
    if (this.modifiedPaths().includes("password")) {
        this.is_new = this.isNew
        this.password = await hash(this.password)
    }
})


userSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate() as any
    const password = update?.password
    if (password) {
        const hashed = await hash(password)
        update.password = hashed
        this.setUpdate(update)
    }
})

userSchema.pre(["find", "findOne"], async function () {
    const query = this.getQuery()
    const { paranoid, ...rest } = query
    if (paranoid) {
        this.setQuery({ ...rest })
    }
    else {
        this.setQuery({ ...rest, isDeleted: { $ne: true } })
    }
})

const userModel = mongoose.models.User || mongoose.model<Iuser>("User", userSchema)


export default userModel