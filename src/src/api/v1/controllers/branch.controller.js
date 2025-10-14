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
exports.remove = exports.update = exports.get = exports.list = exports.create = void 0;
const service = __importStar(require("../services/branch.service"));
const apiResponse_1 = require("../models/apiResponse");
const create = async (req, res, next) => {
    try {
        const created = await service.createBranch(req.body);
        res.status(201).json((0, apiResponse_1.ok)(created));
    }
    catch (e) {
        next((0, apiResponse_1.fail)(e.message || "Failed to create branch", 500));
    }
};
exports.create = create;
const list = async (_req, res, next) => {
    try {
        const items = await service.getBranches();
        res.json((0, apiResponse_1.ok)(items));
    }
    catch (e) {
        next((0, apiResponse_1.fail)(e.message || "Failed to fetch branches", 500));
    }
};
exports.list = list;
const get = async (req, res, next) => {
    try {
        const item = await service.getBranchById(req.params.id);
        if (!item)
            return next((0, apiResponse_1.fail)("Branch not found", 404));
        res.json((0, apiResponse_1.ok)(item));
    }
    catch (e) {
        next((0, apiResponse_1.fail)(e.message || "Failed to fetch branch", 500));
    }
};
exports.get = get;
const update = async (req, res, next) => {
    try {
        const updated = await service.updateBranch(req.params.id, req.body);
        if (!updated)
            return next((0, apiResponse_1.fail)("Branch not found", 404));
        res.json((0, apiResponse_1.ok)(updated));
    }
    catch (e) {
        next((0, apiResponse_1.fail)(e.message || "Failed to update branch", 500));
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        const okDelete = await service.deleteBranch(req.params.id);
        if (!okDelete)
            return next((0, apiResponse_1.fail)("Branch not found", 404));
        res.status(204).send();
    }
    catch (e) {
        next((0, apiResponse_1.fail)(e.message || "Failed to delete branch", 500));
    }
};
exports.remove = remove;
//# sourceMappingURL=branch.controller.js.map