"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.branchUpdateSchema = exports.branchCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.branchCreateSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(80).required(),
    address: joi_1.default.string().min(5).max(200).required(),
    phone: joi_1.default.string().pattern(/^[0-9+\-()\s]{7,20}$/).required(),
});
exports.branchUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(80),
    address: joi_1.default.string().min(5).max(200),
    phone: joi_1.default.string().pattern(/^[0-9+\-()\s]{7,20}$/),
}).min(1);
//# sourceMappingURL=branch.schema.js.map