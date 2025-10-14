"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeUpdateSchema = exports.employeeCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.employeeCreateSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(80).required(),
    position: joi_1.default.string().min(2).max(80).required(),
    email: joi_1.default.string().email().required(),
    branchId: joi_1.default.string().required(),
    department: joi_1.default.string().min(2).max(80).optional(),
});
exports.employeeUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(80),
    position: joi_1.default.string().min(2).max(80),
    email: joi_1.default.string().email(),
    branchId: joi_1.default.string(),
    department: joi_1.default.string().min(2).max(80),
}).min(1);
//# sourceMappingURL=employee.schema.js.map