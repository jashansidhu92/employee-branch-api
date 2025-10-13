import { FirestoreRepository } from "../repositories/firestoreRepository";
import { Employee } from "../models/employee";

const repo = new FirestoreRepository<Employee>("employees");

export const getAll = async () => {
  try {
    return await repo.getDocuments();
  } catch {
    throw new Error("Failed to fetch employees");
  }
};

export const getById = async (id: string) => {
  try {
    return await repo.getDocumentById(id);
  } catch {
    throw new Error("Failed to fetch employee by ID");
  }
};

export const create = async (data: Partial<Employee>) => {
  try {
    const payload: Employee = {
      ...data,
      createdAt: new Date().toISOString()
    } as Employee;
    return await repo.createDocument(payload);
  } catch {
    throw new Error("Failed to create employee");
  }
};

export const update = async (id: string, data: Partial<Employee>) => {
  try {
    return await repo.updateDocument(id, data);
  } catch {
    throw new Error("Failed to update employee");
  }
};

export const remove = async (id: string) => {
  try {
    return await repo.deleteDocument(id);
  } catch {
    throw new Error("Failed to delete employee");
  }
};
