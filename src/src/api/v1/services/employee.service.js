"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesByDepartment = exports.getEmployeesByBranch = exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getEmployees = exports.createEmployee = void 0;
const firestoreRepository_1 = require("../repositories/firestoreRepository");
const repo = new firestoreRepository_1.FirestoreRepository("employees");
const createEmployee = async (payload) => {
    return repo.create(payload);
};
exports.createEmployee = createEmployee;
const getEmployees = async () => repo.getAll();
exports.getEmployees = getEmployees;
const getEmployeeById = async (id) => repo.getById(id);
exports.getEmployeeById = getEmployeeById;
const updateEmployee = async (id, payload) => repo.update(id, payload);
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (id) => repo.delete(id);
exports.deleteEmployee = deleteEmployee;
const getEmployeesByBranch = async (branchId) => repo.queryByField("branchId", branchId);
exports.getEmployeesByBranch = getEmployeesByBranch;
const getEmployeesByDepartment = async (department) => repo.queryByField("department", department);
exports.getEmployeesByDepartment = getEmployeesByDepartment;
//# sourceMappingURL=employee.service.js.map