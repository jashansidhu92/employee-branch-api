import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { ApiResponse } from "../models/api";
import { Branch } from "../models/branch";

export const getAll = async (_req: Request, res: Response<ApiResponse<Branch[]>>) => {
  try {
    const branches = await branchService.getAll();
    res.status(200).json({ success: true, data: branches });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || "Failed to retrieve branches" });
  }
};

export const getById = async (req: Request, res: Response<ApiResponse<Branch>>) => {
  try {
    const branch = await branchService.getById(req.params.id);
    if (!branch) {
      return res.status(404).json({ success: false, error: "Branch not found" });
    }
    res.status(200).json({ success: true, data: branch });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || "Error retrieving branch" });
  }
};

export const create = async (req: Request, res: Response<ApiResponse<Branch>>) => {
  try {
    const newBranch = await branchService.create(req.body);
    res.status(201).json({ success: true, data: newBranch, message: "Branch created successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || "Failed to create branch" });
  }
};

export const update = async (req: Request, res: Response<ApiResponse<Branch>>) => {
  try {
    const updatedBranch = await branchService.update(req.params.id, req.body);
    if (!updatedBranch) {
      return res.status(404).json({ success: false, error: "Branch not found" });
    }
    res.status(200).json({ success: true, data: updatedBranch, message: "Branch updated successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || "Failed to update branch" });
  }
};

export const remove = async (req: Request, res: Response<ApiResponse<{ message: string }>>) => {
  try {
    const deleted = await branchService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Branch not found" });
    }
    res.status(200).json({ success: true, data: { message: "Branch deleted successfully" } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || "Failed to delete branch" });
  }
};
