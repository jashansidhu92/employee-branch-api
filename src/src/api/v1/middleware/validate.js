"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (schema) => {
    return (req, _res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
        if (error) {
            const details = error.details.map((d) => d.message).join("; ");
            const err = new Error(details);
            err.status = 422;
            return next(err);
        }
        req.body = value;
        next();
    };
};
exports.validateBody = validateBody;
//# sourceMappingURL=validate.js.map