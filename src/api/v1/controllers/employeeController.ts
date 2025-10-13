import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { ApiResponse } from "../models/api";
import { Employee } from "../models/employee";

export const getAll = async (_req: Request, res: Response<ApiResponse<Employee[]>>) => {
  try {
    const data = await employeeService.getAll();
    res.status(200).json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, error: "Failed to retrieve employees" });
  }
};

export const getById = async (req: Request, res: Response<ApiResponse<Employee>>) => {
  try {
    const item = await employeeService.getById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Employee not found" });
    res.status(200).json({ success: true, data: item });
  } catch {
    res.status(500).json({ success: false, error: "Error retrieving employee" });
  }
};

export const create = async (req: Request, res: Response<ApiResponse<Employee>>) => {
  try {
    const created = await employeeService.create(req.body);
    res.status(201).json({ success: true, data: created });
  } catch {
    res.status(500).json({ success: false, error: "Failed to create employee" });
  }
};

export const update = async (req: Request, res: Response<ApiResponse<Employee>>) => {
  try {
    const updated = await employeeService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: "Employee not found" });
    res.status(200).json({ success: true, data: updated });
  } catch {
    res.status(500).json({ success: false, error: "Failed to update employee" });
  }
};

export const remove = async (req: Request, res: Response<ApiResponse<{ message: string }>>) => {
  try {
    const deleted = await employeeService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: "Employee not found" });
    res.status(200).json({ success: true, data: { message: "Employee deleted successfully" } });
  } catch {
    res.status(500).json({ success: false, error: "Failed to delete employee" });
  }
};
