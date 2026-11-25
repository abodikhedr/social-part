import { ObjectId, ProjectionType, UpdateQuery } from "mongoose";
import { Model, QueryOptions } from "mongoose";
import { QueryFilter } from "mongoose";
export declare class DBRepository<T> {
    readonly model: Model<T>;
    constructor(model: Model<T>);
    create: (data: Partial<T>) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>>[]>;
    findOne: ({ filter, options, projection }: {
        filter: QueryFilter<T>;
        options?: QueryOptions<T>;
        projection?: ProjectionType<T>;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    deleteOne: ({ filter }: {
        filter: QueryFilter<T>;
    }) => Promise<import("mongodb").DeleteResult>;
    find: ({ filter, options }: {
        filter: QueryFilter<T>;
        options: QueryOptions<T>;
        projection: ProjectionType<T>;
    }) => Promise<import("mongoose").IfAny<Omit<T, Extract<string, keyof T>> | (Pick<T, Extract<string, keyof T>> & Pick<T, Extract<"_id", keyof T>>), any, import("mongoose").Document<unknown, {}, Omit<T, Extract<string, keyof T>> | (Pick<T, Extract<string, keyof T>> & Pick<T, Extract<"_id", keyof T>>), {}, import("mongoose").DefaultSchemaOptions> & (((import("mongoose").Require_id<Omit<T, Extract<string, keyof T>>> | import("mongoose").Require_id<Pick<T, Extract<string, keyof T>> & Pick<T, Extract<"_id", keyof T>>>) & {
        __v: number;
    }) & (import("mongoose").AddDefaultId<Omit<T, Extract<string, keyof T>>, {}, import("mongoose").DefaultSchemaOptions> | import("mongoose").AddDefaultId<Pick<T, Extract<string, keyof T>> & Pick<T, Extract<"_id", keyof T>>, {}, import("mongoose").DefaultSchemaOptions>))>[]>;
    findById: ({ id, options }: {
        id: ObjectId;
        options: QueryOptions<T>;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    findByIdAndUpdate: ({ id, update, options }: {
        id: ObjectId;
        options: QueryOptions<T>;
        update: UpdateQuery<T>;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    findOneAndUpdate: ({ filter, update, options }: {
        filter: QueryFilter<T>;
        options: QueryOptions<T>;
        update: UpdateQuery<T>;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>> | null>;
    findOneAndDelete: ({ filter }: {
        filter: QueryFilter<T>;
    }) => Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Require_id<T> & {
        __v: number;
    } & import("mongoose").AddDefaultId<T, {}, import("mongoose").DefaultSchemaOptions>> | null>;
}
//# sourceMappingURL=db.repository%20copy.d.ts.map