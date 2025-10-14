"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBranch = exports.updateBranch = exports.getBranchById = exports.getBranches = exports.createBranch = void 0;
const firestoreRepository_1 = require("../repositories/firestoreRepository");
const repo = new firestoreRepository_1.FirestoreRepository("branches");
const createBranch = async (payload) => {
    return repo.create(payload);
};
exports.createBranch = createBranch;
const getBranches = async () => repo.getAll();
exports.getBranches = getBranches;
const getBranchById = async (id) => repo.getById(id);
exports.getBranchById = getBranchById;
const updateBranch = async (id, payload) => repo.update(id, payload);
exports.updateBranch = updateBranch;
const deleteBranch = async (id) => repo.delete(id);
exports.deleteBranch = deleteBranch;
//# sourceMappingURL=branch.service.js.map