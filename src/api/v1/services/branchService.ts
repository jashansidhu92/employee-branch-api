import { FirestoreRepository } from "../repositories/firestoreRepository";
import { Branch } from "../models/branch";

const branchRepo = new FirestoreRepository<Branch>("branches");

export const getAll = async () => {
  try {
    return await branchRepo.getDocuments();
  } catch {
    throw new Error("Failed to fetch branches");
  }
};

export const getById = async (id: string) => {
  try {
    return await branchRepo.getDocumentById(id);
  } catch {
    throw new Error("Failed to fetch branch by ID");
  }
};

export const create = async (data: Branch) => {
  try {
    return await branchRepo.createDocument(data);
  } catch {
    throw new Error("Failed to create branch");
  }
};

export const update = async (id: string, data: Partial<Branch>) => {
  try {
    return await branchRepo.updateDocument(id, data);
  } catch {
    throw new Error("Failed to update branch");
  }
};

export const remove = async (id: string) => {
  try {
    return await branchRepo.deleteDocument(id);
  } catch {
    throw new Error("Failed to delete branch");
  }
};
