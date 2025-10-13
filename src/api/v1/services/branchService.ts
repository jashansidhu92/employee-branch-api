import { FirestoreRepository } from "../repositories/firestoreRepository";
import { Branch } from "../models/branch";

const repo = new FirestoreRepository<Branch>("branches");

export const getAll = async () => {
  try {
    return await repo.getDocuments();
  } catch {
    throw new Error("Failed to fetch branches");
  }
};

export const getById = async (id: string) => {
  try {
    return await repo.getDocumentById(id);
  } catch {
    throw new Error("Failed to fetch branch by ID");
  }
};

export const create = async (data: Partial<Branch>) => {
  try {
    const payload: Branch = {
      ...data,
      createdAt: new Date().toISOString()
    } as Branch;
    return await repo.createDocument(payload);
  } catch {
    throw new Error("Failed to create branch");
  }
};

export const update = async (id: string, data: Partial<Branch>) => {
  try {
    return await repo.updateDocument(id, data);
  } catch {
    throw new Error("Failed to update branch");
  }
};

export const remove = async (id: string) => {
  try {
    return await repo.deleteDocument(id);
  } catch {
    throw new Error("Failed to delete branch");
  }
};
