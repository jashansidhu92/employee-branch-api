import { FirestoreRepository } from "../repositories/firestoreRepository";
import { Employee } from "../models/employee.model";


const repo = new FirestoreRepository<Employee>("employees");


export const createEmployee = async (payload: Omit<Employee, "id" | "createdAt" | "updatedAt">) => {
return repo.create(payload);
};


export const getEmployees = async () => repo.getAll();


export const getEmployeeById = async (id: string) => repo.getById(id);


export const updateEmployee = async (id: string, payload: Partial<Employee>) => repo.update(id, payload);


export const deleteEmployee = async (id: string) => repo.delete(id);


export const getEmployeesByBranch = async (branchId: string) => repo.queryByField("branchId", branchId);


export const getEmployeesByDepartment = async (department: string) => repo.queryByField("department", department as any);