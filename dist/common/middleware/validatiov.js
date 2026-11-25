"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const globalErrorHandling_js_1 = require("../utils/globalErrorHandling.js");
const validation = (schema) => {
    return async (req, res, next) => {
        const resultError = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key])
                continue;
            const result = schema[key].safeParse(req[key]);
            if (!result.success) {
                resultError.push(result.error.message);
            }
        }
        if (resultError.length > 0) {
            throw new globalErrorHandling_js_1.AppError(JSON.parse(resultError.join(", ")), 400);
        }
        next();
    };
};
exports.validation = validation;
//# sourceMappingURL=validatiov.js.map