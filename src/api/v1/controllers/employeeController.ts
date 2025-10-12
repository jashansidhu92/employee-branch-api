import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export const getAllEmployees = (req: Request, res: Response) => {
  const allEmployees = employeeService.getAllEmployees();
  res.status(200).json(allEmployees);
};

export const getEmployeeById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID parameter" });

  const employee = employeeService.getEmployeeById(id);
  if (!employee) return res.status(404).json({ error: "Employee not found" });

  res.status(200).json(employee);
};

export const createEmployee = (req: Request, res: Response) => {
  const { name, position, department, email, phone, branchId } = req.body;
  if (!name || !position || !department || !email || !phone || !branchId) {
    return res.status(400).json({ error: "Missing required employee fields" });
  }

  const newEmployee = employeeService.createEmployee({
    name,
    position,
    department,
    email,
    phone,
    branchId,
  });

  res.status(201).json(newEmployee);
};

export const updateEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID parameter" });

  const updatedEmployee = employeeService.updateEmployee(id, req.body);
  if (!updatedEmployee)
    return res.status(404).json({ error: "Employee not found" });

  res.status(200).json(updatedEmployee);
};

export const deleteEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID parameter" });

  const deleted = employeeService.deleteEmployee(id);
  if (!deleted) return res.status(404).json({ error: "Employee not found" });

  res.status(200).json({ message: "Employee deleted successfully" });
};
// ✅ GET all employees for a branch
export const getEmployeesByBranch = (req: Request, res: Response) => {
  const branchId = Number(req.params.branchId);
  if (isNaN(branchId)) {
    return res.status(400).json({ error: "Invalid branch ID parameter" });
  }

  const result = employeeService.getEmployeesByBranch(branchId);
  if (!result.length)
    return res.status(404).json({ message: "No employees found for this branch" });

  res.status(200).json(result);
};

export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const { department } = req.params;
  if (!department) {
    return res
      .status(400)
      .json({ error: "Missing required department parameter" });
  }

  const result = employeeService.getEmployeesByDepartment(department);
  if (!result.length)
    return res.status(404).json({ message: "No employees found in this department" });

  res.status(200).json(result);
};
