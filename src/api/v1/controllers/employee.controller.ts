import { Request, Response, NextFunction } from "express";
import * as service from "../services/employee.service";
import { ok, fail } from "../models/apiResponse";  

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await service.createEmployee(req.body);
    res.status(201).json(ok(created)); 
  } catch (err: any) {
    next(fail(err.message || "Failed to create employee", 500));
  }
};

export const list = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await service.getEmployees();
    res.json(ok(items));
  } catch (err: any) {
    next(fail(err.message || "Failed to fetch employees", 500));
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await service.getEmployeeById(req.params.id);
    if (!item) return next(fail("Employee not found", 404));
    res.json(ok(item));
  } catch (err: any) {
    next(fail(err.message || "Failed to fetch employee", 500));
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await service.updateEmployee(req.params.id, req.body);
    if (!updated) return next(fail("Employee not found", 404));
    res.json(ok(updated));
  } catch (err: any) {
    next(fail(err.message || "Failed to update employee", 500));
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const okDelete = await service.deleteEmployee(req.params.id);
    if (!okDelete) return next(fail("Employee not found", 404));
    res.status(204).send();
  } catch (err: any) {
    next(fail(err.message || "Failed to delete employee", 500));
  }
};

export const byBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await service.getEmployeesByBranch(req.params.branchId);
    res.json(ok(employees));
  } catch (err: any) {
    next(fail(err.message || "Failed to fetch employees by branch", 500));
  }
};

export const byDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await service.getEmployeesByDepartment(req.params.department);
    res.json(ok(employees));
  } catch (err: any) {
    next(fail(err.message || "Failed to fetch employees by department", 500));
  }
};
