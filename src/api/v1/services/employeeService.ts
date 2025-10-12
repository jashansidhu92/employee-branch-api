import { FirestoreRepository } from "../repositories/firestoreRepository";
import { Employee } from "../models/employee";

const employeeRepo = new FirestoreRepository<Employee>("employees");

export const getAll = async () => {
  try {
    return await employeeRepo.getDocuments();
  } catch (error) {
    throw new Error("Failed to fetch employees");
  }
};

export const getById = async (id: string) => {
  try {
    return await employeeRepo.getDocumentById(id);
  } catch (error) {
    throw new Error("Failed to fetch employee by ID");
  }
};

export const create = async (data: Employee) => {
  try {
    return await employeeRepo.createDocument(data);
  } catch (error) {
    throw new Error("Failed to create employee");
  }
};

export const update = async (id: string, data: Partial<Employee>) => {
  try {
    return await employeeRepo.updateDocument(id, data);
  } catch (error) {
    throw new Error("Failed to update employee");
  }
};

export const remove = async (id: string) => {
  try {
    return await employeeRepo.deleteDocument(id);
  } catch (error) {
    throw new Error("Failed to delete employee");
  }
};
