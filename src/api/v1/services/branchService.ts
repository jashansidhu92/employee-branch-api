import { Branch } from "../models/branch";

let branches: Branch[] = [];

export const all = async (): Promise<Branch[]> => branches;

export const byId = async (id: string): Promise<Branch | null> => {
  return branches.find((b) => b.id === id) || null;
};

export const create = async (data: Omit<Branch, "id">): Promise<Branch> => {
  const newBranch: Branch = { id: Date.now().toString(), ...data };
  branches.push(newBranch);
  return newBranch;
};

export const update = async (
  id: string,
  updates: Partial<Branch>
): Promise<Branch | null> => {
  const index = branches.findIndex((b) => b.id === id);
  if (index === -1) return null;
  branches[index] = { ...branches[index], ...updates };
  return branches[index];
};

export const remove = async (id: string): Promise<boolean> => {
  const initialLength = branches.length;
  branches = branches.filter((b) => b.id !== id);
  return branches.length < initialLength;
};
