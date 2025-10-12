import { branches, Branch } from "../../../data/branches";

export const getAllBranches = (): Branch[] => {
  return branches;
};

export const getBranchById = (id: number): Branch | undefined => {
  return branches.find((b) => b.id === id);
};

export const createBranch = (data: Omit<Branch, "id">): Branch => {
  const newBranch: Branch = {
    id: branches.length ? branches[branches.length - 1].id + 1 : 1,
    ...data,
  };
  branches.push(newBranch);
  return newBranch;
};

export const updateBranch = (
  id: number,
  updates: Partial<Branch>
): Branch | undefined => {
  const index = branches.findIndex((b) => b.id === id);
  if (index === -1) return undefined;
  branches[index] = { ...branches[index], ...updates };
  return branches[index];
};

export const deleteBranch = (id: number): boolean => {
  const index = branches.findIndex((b) => b.id === id);
  if (index === -1) return false;
  branches.splice(index, 1);
  return true;
};
