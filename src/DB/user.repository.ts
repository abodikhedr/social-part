import { ObjectId, PopulateOptions, ProjectionType, UpdateQuery, } from "mongoose"
import { Model, QueryOptions, } from "mongoose"
import { QueryFilter } from "mongoose"
import { DBRepository } from "./db.repository.js"
import userModel, { Iuser } from "./models/user.model.js"


export class UserRepository extends DBRepository<Iuser> {
    constructor(public readonly model: Model<Iuser> = userModel) {
        super(model)
    }
    createUser = async (data:Partial<Iuser>) => {
        return await this.model.create([data])
    }


}