"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.byDepartment = exports.byBranch = exports.remove = exports.update = exports.get = exports.list = exports.create = void 0;
const service = __importStar(require("../services/employee.service"));
const apiResponse_1 = require("../models/apiResponse");
const create = async (req, res, next) => {
    try {
        const created = await service.createEmployee(req.body);
        res.status(201).json((0, apiResponse_1.ok)(created));
    }
    catch (err) {
        next((0, apiResponse_1.fail)(err.message || "Failed to create employee", 500));
    }
};
exports.create = create;
const list = async (_req, res, next) => {
    try {
        const items = await service.getEmployees();
        res.json((0, apiResponse_1.ok)(items));
    }
    catch (err) {
        next((0, apiResponse_1.fail)(err.message || "Failed to fetch employees", 500));
    }
};
exports.list = list;
const get = async (req, res, next) => {
    try {
        const item = await service.getEmployeeById(req.params.id);
        if (!item)
            return next((0, apiResponse_1.fail)("Employee not found", 404));
        res.json((0, apiResponse_1.ok)(item));
    }
    catch (err) {
        next((0, apiResponse_1.fail)(err.message || "Failed to fetch employee", 500));
    }
};
exports.get = get;
const update = async (req, res, next) => {
    try {
        const updated = await service.updateEmployee(req.params.id, req.body);
        if (!updated)
            return next((0, apiResponse_1.fail)("Employee not found", 404));
        res.json((0, apiResponse_1.ok)(updated));
    }
    catch (err) {
        next((0, apiResponse_1.fail)(err.message || "Failed to update employee", 500));
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        const okDelete = await service.deleteEmployee(req.params.id);
        if (!okDelete)
            return next((0, apiResponse_1.fail)("Employee not found", 404));
        res.status(204).send();
    }
    catch (err) {
        next((0, apiResponse_1.fail)(err.message || "Failed to delete employee", 500));
    }
};
exports.remove = remove;
const byBranch = async (req, res, next) => {
    try {
        const employees = await service.getEmployeesByBranch(req.params.branchId);
        res.json((0, apiResponse_1.ok)(employees));
    }
    catch (err) {
        next((0, apiResponse_1.fail)(err.message || "Failed to fetch employees by branch", 500));
    }
};
exports.byBranch = byBranch;
const byDepartment = async (req, res, next) => {
    try {
        const employees = await service.getEmployeesByDepartment(req.params.department);
        res.json((0, apiResponse_1.ok)(employees));
    }
    catch (err) {
        next((0, apiResponse_1.fail)(err.message || "Failed to fetch employees by department", 500));
    }
};
exports.byDepartment = byDepartment;
//# sourceMappingURL=employee.controller.js.map