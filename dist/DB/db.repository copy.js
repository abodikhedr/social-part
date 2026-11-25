"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBRepository = void 0;
class DBRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    create = async (data) => {
        return await this.model.create([data]);
    };
    findOne = async ({ filter, options, projection }) => {
        return await this.model.findOne(filter, options);
    };
    deleteOne = async ({ filter }) => {
        return await this.model.deleteOne(filter);
    };
    find = async ({ filter, options = {} }) => {
        const data = this.model.find(filter, options);
        if (options?.limit)
            data.limit(options?.limit);
        if (options?.skip)
            data.skip(options?.skip);
        if (options?.sort)
            data.sort(options?.sort);
        if (options?.populate)
            data.populate(options?.populate);
        return await data.exec();
    };
    findById = async ({ id, options = {} }) => {
        return await this.model.findById(id, options);
    };
    findByIdAndUpdate = async ({ id, update, options = {} }) => {
        return await this.model.findByIdAndUpdate(id, update, { new: true, runValidators: true, ...options });
    };
    findOneAndUpdate = async ({ filter, update, options = {} }) => {
        return await this.model.findOneAndUpdate(filter, update, { new: true, runValidators: true, ...options });
    };
    findOneAndDelete = async ({ filter }) => {
        return await this.model.findOneAndDelete(filter);
    };
}
exports.DBRepository = DBRepository;
//# sourceMappingURL=db.repository%20copy.js.map