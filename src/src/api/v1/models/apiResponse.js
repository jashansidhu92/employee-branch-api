"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = exports.ok = void 0;
const ok = (data) => ({ success: true, data });
exports.ok = ok;
const fail = (message, status = 400) => {
    const err = new Error(message);
    err.status = status;
    return err;
};
exports.fail = fail;
//# sourceMappingURL=apiResponse.js.map