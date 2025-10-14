import { FirestoreRepository } from "../repositories/firestoreRepository";
import { Branch } from "../models/branch.model";


const repo = new FirestoreRepository<Branch>("branches");


export const createBranch = async (payload: Omit<Branch, "id" | "createdAt" | "updatedAt">) => {
return repo.create(payload);
};


export const getBranches = async () => repo.getAll();


export const getBranchById = async (id: string) => repo.getById(id);


export const updateBranch = async (id: string, payload: Partial<Branch>) => repo.update(id, payload);


export const deleteBranch = async (id: string) => repo.delete(id);