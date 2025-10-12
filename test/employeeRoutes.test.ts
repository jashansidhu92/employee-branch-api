import request from "supertest";
import app from "../src/app";

describe("Employee API CRUD", () => {
  it("should create a new employee", async () => {
    const res = await request(app).post("/api/v1/employees").send({
      name: "John Doe",
      position: "Accountant",
      department: "Finance",
      email: "john.doe@pixell-river.com",
      phone: "204-555-0500",
      branchId: 1,
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("John Doe");
  });

  it("should return 400 if missing required fields", async () => {
    const res = await request(app).post("/api/v1/employees").send({
      position: "Analyst",
    });
    expect(res.status).toBe(400);
  });

  it("should return all employees", async () => {
    const res = await request(app).get("/api/v1/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return one employee by ID", async () => {
    const res = await request(app).get("/api/v1/employees/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("should return 404 for invalid ID", async () => {
    const res = await request(app).get("/api/v1/employees/9999");
    expect(res.status).toBe(404);
  });

  it("should update an employee", async () => {
    const res = await request(app).put("/api/v1/employees/1").send({
      phone: "204-555-9999",
    });
    expect(res.status).toBe(200);
    expect(res.body.phone).toBe("204-555-9999");
  });

  it("should delete an employee", async () => {
    const res = await request(app).delete("/api/v1/employees/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Employee deleted successfully");
  });
});
describe("Employee Logical Endpoints", () => {
  it("should return all employees for a valid branch ID", async () => {
    const res = await request(app).get("/api/v1/employees/branch/2");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every((emp: any) => emp.branchId === 2)).toBe(true);
  });

  it("should return 400 for invalid branch ID", async () => {
    const res = await request(app).get("/api/v1/employees/branch/invalid");
    expect(res.status).toBe(400);
  });

  it("should return employees in a valid department", async () => {
    const res = await request(app).get("/api/v1/employees/department/Loans");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every((emp: any) => emp.department === "Loans")).toBe(true);
  });

  it("should return 404 if no employees found in department", async () => {
    const res = await request(app).get("/api/v1/employees/department/UnknownDept");
    expect(res.status).toBe(404);
  });
});
