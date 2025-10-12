import { employees, Employee } from "../../../data/employees";

export const getAllEmployees = (): Employee[] => {
  return employees;
};

export const getEmployeeById = (id: number): Employee | undefined => {
  return employees.find((emp) => emp.id === id);
};

export const createEmployee = (data: Omit<Employee, "id">): Employee => {
  const newEmployee: Employee = {
    id: employees.length ? employees[employees.length - 1].id + 1 : 1,
    ...data,
  };
  employees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = (
  id: number,
  updates: Partial<Employee>
): Employee | undefined => {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return undefined;
  employees[index] = { ...employees[index], ...updates };
  return employees[index];
};

export const deleteEmployee = (id: number): boolean => {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return false;
  employees.splice(index, 1);
  return true;
};
export const getEmployeesByBranch = (branchId: number): Employee[] => {
  return employees.filter((emp) => emp.branchId === branchId);
};

export const getEmployeesByDepartment = (department: string): Employee[] => {
  const deptLower = department.toLowerCase();
  return employees.filter(
    (emp) => emp.department.toLowerCase() === deptLower
  );
};
