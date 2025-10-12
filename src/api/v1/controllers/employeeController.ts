import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { ApiResponse } from "../models/api";

export const getAll = async (_req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const employees = await employeeService.getAll();
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve employees" });
  }
};

export const getById = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const employee = await employeeService.getById(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error retrieving employee" });
  }
};

export const create = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const newEmployee = await employeeService.create(req.body);
    res.status(201).json({ success: true, data: newEmployee });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create employee" });
  }
};

export const update = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const updatedEmployee = await employeeService.update(req.params.id, req.body);
    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }
    res.status(200).json({ success: true, data: updatedEmployee });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update employee" });
  }
};

export const remove = async (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const deleted = await employeeService.remove(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete employee" });
  }
};
