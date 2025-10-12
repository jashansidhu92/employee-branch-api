import { Request, Response } from "express";
import * as branchService from "../services/branchService";

export const getAllBranches = (req: Request, res: Response) => {
  const allBranches = branchService.getAllBranches();
  res.status(200).json(allBranches);
};

export const getBranchById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID parameter" });

  const branch = branchService.getBranchById(id);
  if (!branch) return res.status(404).json({ error: "Branch not found" });

  res.status(200).json(branch);
};

export const createBranch = (req: Request, res: Response) => {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    return res.status(400).json({ error: "Missing required branch fields" });
  }

  const newBranch = branchService.createBranch({ name, address, phone });
  res.status(201).json(newBranch);
};

export const updateBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID parameter" });

  const updatedBranch = branchService.updateBranch(id, req.body);
  if (!updatedBranch)
    return res.status(404).json({ error: "Branch not found" });

  res.status(200).json(updatedBranch);
};

export const deleteBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID parameter" });

  const deleted = branchService.deleteBranch(id);
  if (!deleted) return res.status(404).json({ error: "Branch not found" });

  res.status(200).json({ message: "Branch deleted successfully" });
};
