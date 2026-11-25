import { ObjectId, PopulateOptions, ProjectionType, UpdateQuery, } from "mongoose"
import { Model, QueryOptions, } from "mongoose"
import { QueryFilter } from "mongoose"


export abstract class DBRepository<T> {
    constructor(public readonly model: Model<T>) { }

    create = async (data:Partial<T>) => {
        return await this.model.create([data])
    }
    findOne = async ({ filter, options, projection }: {
        filter: QueryFilter<T>,
        options?: QueryOptions<T>,
        projection?: ProjectionType<T>
    }) => {
        return await this.model.findOne(filter, options)
    }
    deleteOne = async ({ filter}: {
        filter: QueryFilter<T>,
    }) => {
        return await this.model.deleteOne(filter)
    }
    find = async ({ filter, options = {} }: {
        filter: QueryFilter<T>,
        options: QueryOptions<T>,
        projection: ProjectionType<T>
    }) => {
        const data = this.model.find(filter, options)
        if (options?.limit) data.limit(options?.limit)
        if (options?.skip) data.skip(options?.skip)
        if (options?.sort) data.sort(options?.sort)
        if (options?.populate) data.populate(options?.populate as PopulateOptions)
        return await data.exec()
    }

    findById = async ({ id, options = {} }: {
        id: ObjectId,
        options?: QueryOptions<T>,
    }) => {
        return await this.model.findById(id, options)
    }


    findByIdAndUpdate = async ({ id, update, options = {} }: {
        id: ObjectId,
        options: QueryOptions<T>,
        update: UpdateQuery<T>
    }) => {
        return await this.model.findByIdAndUpdate(id, update, { new: true, runValidators: true, ...options })
    }
    findOneAndUpdate = async ({ filter, update, options = {} }: {
        filter: QueryFilter<T>,
        options?: QueryOptions<T>,
        update: UpdateQuery<T>
    }) => {
        return await this.model.findOneAndUpdate(filter, update, { new: true, runValidators: true, ...options })
    }
    findOneAndDelete = async ({ filter }: {
        filter: QueryFilter<T>,
    }) => {
        return await this.model.findOneAndDelete(filter)
    }

}